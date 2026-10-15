"use client";

import { useEffect, useState } from "react";
import { AdminFrame } from "@/components/admin/AdminFrame";

type UserRow = { username: string; email: string; is_staff: boolean; is_superuser: boolean };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    fetch("/api/admin/users").then((response) => response.json()).then((data) => {
      if (data.ok) setUsers(data.users);
    });
  }, []);

  return (
    <AdminFrame>
      <h1>İstifadəçilər</h1>
      <p className="admin-lead">Superuser mağaza məlumatını dəyişə bilər.</p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>İstifadəçi</th>
            <th>E-poçt</th>
            <th>Staff</th>
            <th>Superuser</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_staff ? "Bəli" : "Xeyr"}</td>
              <td>{user.is_superuser ? "Bəli" : "Xeyr"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminFrame>
  );
}
