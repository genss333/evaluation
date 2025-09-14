"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Method } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth", {
      method: Method.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Login สำเร็จ, redirect ไปหน้า dashboard หรือหน้าหลัก
      router.push("/");
    } else {
      const data = await response.json();
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-48">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
