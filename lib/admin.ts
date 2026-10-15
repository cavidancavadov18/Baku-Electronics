import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import fs from "fs";
import path from "path";

export type AdminUser = {
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  is_staff: boolean;
  is_superuser: boolean;
};

export type ProductOverride = {
  name?: string;
  price?: number;
  oldPrice?: number;
  hidden?: boolean;
};

const secret = "baku-electronics-local-admin";
const usersFile = path.join(process.cwd(), "data", "admin-users.json");
const overridesFile = path.join(process.cwd(), "data", "admin-overrides.json");

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 32).toString("hex");
}

export function ensureSuperuser() {
  const users = readUsers();
  if (users.some((user) => user.username === "admin")) return users;
  const salt = randomBytes(16).toString("hex");
  users.push({
    username: "admin",
    email: "admin@bakuelectronics.local",
    passwordHash: hashPassword("admin", salt),
    salt,
    is_staff: true,
    is_superuser: true,
  });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return users;
}

function readUsers(): AdminUser[] {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf8")) as AdminUser[];
}

export function publicUser(user: AdminUser) {
  return {
    username: user.username,
    email: user.email,
    is_staff: user.is_staff,
    is_superuser: user.is_superuser,
  };
}

export function authenticate(username: string, password: string) {
  const user = ensureSuperuser().find((item) => item.username === username);
  if (!user) return null;
  const actual = Buffer.from(hashPassword(password, user.salt), "hex");
  const expected = Buffer.from(user.passwordHash, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  return user;
}

export function signSession(username: string) {
  const body = Buffer.from(JSON.stringify({ username, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function readSession(token: string | undefined) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { username: string; exp: number };
  if (!data.username || data.exp < Date.now()) return null;
  const user = ensureSuperuser().find((item) => item.username === data.username && item.is_staff);
  return user ? publicUser(user) : null;
}

export function listUsers() {
  return ensureSuperuser().map(publicUser);
}

export function readOverrides() {
  if (!fs.existsSync(overridesFile)) return {} as Record<string, ProductOverride>;
  return JSON.parse(fs.readFileSync(overridesFile, "utf8")) as Record<string, ProductOverride>;
}

export function writeOverride(id: string, patch: ProductOverride) {
  const all = readOverrides();
  const next = { ...all[id], ...patch };
  if (!next.hidden && next.name === undefined && next.price === undefined && next.oldPrice === undefined) delete all[id];
  else all[id] = next;
  const tmp = `${overridesFile}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(all, null, 2));
  fs.renameSync(tmp, overridesFile);
  return all[id] ?? null;
}
