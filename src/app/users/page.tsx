"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the User type
interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]); // 👈 Explicitly set type
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data: User[] = await res.json(); // 👈 Ensure correct type
    setUsers(data);
  }

  async function handleDelete(id: string) {
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchUsers();
  }

  return (
    <div>
      <h1>User List</h1>
      <button onClick={() => router.push("/users/add")}>Add User</button>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => router.push(`/users/add?id=${user._id}`)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
