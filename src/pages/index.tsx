"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>User Management</h1>
      <nav>
        <ul>
          <li>
            <Link href="/users/add">Add User</Link>
          </li>
          <li>
            <Link href="/users">User List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
