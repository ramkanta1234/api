"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      fetch(`/api/users?id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setPhone(data.phone);
          setEmail(data.email);
        });
    }
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();

    const method = userId ? "PUT" : "POST";
    const body = JSON.stringify(userId ? { id: userId, name, phone, email } : { name, phone, email });

    await fetch("/api/users", {
      method,
      body,
      headers: { "Content-Type": "application/json" },
    });

    router.push("/users");
  }

  return (
    <div>
      <h1>{userId ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">{userId ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}
