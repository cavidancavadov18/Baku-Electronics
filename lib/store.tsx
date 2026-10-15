"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = { id: string; qty: number };
export type Account = { name: string; phone: string };
type Theme = "light" | "dark";

type StoreValue = {
  ready: boolean;
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  account: Account | null;
  theme: Theme;
  notice: string;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  toggleWish: (id: string) => void;
  toggleCompare: (id: string) => boolean;
  setAccount: (account: Account | null) => void;
  setTheme: (theme: Theme) => void;
  setNotice: (text: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);
const key = "be-store";

type Persisted = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  account: Account | null;
  theme: Theme;
};

const empty: Persisted = { cart: [], wishlist: [], compare: [], account: null, theme: "light" };

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      const theme = (localStorage.getItem("be-theme") as Theme | null) ?? "light";
      if (raw) {
        const parsed = JSON.parse(raw) as Persisted;
        setData({ ...empty, ...parsed, theme });
      } else {
        setData({ ...empty, theme });
      }
      document.documentElement.dataset.theme = theme;
    } catch {
      setData(empty);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem("be-theme", data.theme);
    document.documentElement.dataset.theme = data.theme;
  }, [data, ready]);

  const value = useMemo<StoreValue>(() => {
    return {
      ready,
      ...data,
      notice,
      setNotice,
      addToCart: (id, qty = 1) => {
        setData((prev) => {
          const found = prev.cart.find((line) => line.id === id);
          const cart = found
            ? prev.cart.map((line) => (line.id === id ? { ...line, qty: line.qty + qty } : line))
            : [...prev.cart, { id, qty }];
          return { ...prev, cart };
        });
      },
      setQty: (id, qty) => {
        setData((prev) => ({
          ...prev,
          cart: qty < 1 ? prev.cart.filter((line) => line.id !== id) : prev.cart.map((line) => (line.id === id ? { ...line, qty } : line)),
        }));
      },
      removeFromCart: (id) => setData((prev) => ({ ...prev, cart: prev.cart.filter((line) => line.id !== id) })),
      toggleWish: (id) =>
        setData((prev) => ({
          ...prev,
          wishlist: prev.wishlist.includes(id) ? prev.wishlist.filter((item) => item !== id) : [...prev.wishlist, id],
        })),
      toggleCompare: (id) => {
        if (data.compare.includes(id)) {
          setData((prev) => ({ ...prev, compare: prev.compare.filter((item) => item !== id) }));
          return true;
        }
        if (data.compare.length >= 3) return false;
        setData((prev) => ({ ...prev, compare: [...prev.compare, id] }));
        return true;
      },
      setAccount: (account) => setData((prev) => ({ ...prev, account })),
      setTheme: (theme) => setData((prev) => ({ ...prev, theme })),
    };
  }, [data, notice, ready]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("Store missing");
  return value;
}
