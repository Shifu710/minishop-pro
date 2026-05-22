"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, message } from "antd";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@minishop.pro");
  const [password, setPassword] = useState("demo123456");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    const response = await fetch("/api/auth/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);

    if (!response.ok) {
      message.error("Use the demo credentials shown on this page.");
      return;
    }

    message.success("Demo login successful");
    router.push("/dashboard");
  }

  return (
    <main className="admin-bg grid min-h-screen place-items-center px-6">
      <div className="dark-panel w-full max-w-md p-6">
        <p className="text-sm font-bold text-cyan-200">MiniShop Pro / 小店智选</p>
        <h1 className="mt-2 text-3xl font-black">Admin demo login</h1>
        <p className="mt-3 text-sm text-slate-400">Demo account: demo@minishop.pro / demo123456</p>
        <div className="mt-6 grid gap-3">
          <Input value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button loading={loading} onClick={() => void login()} type="primary">Login with server-side demo auth</Button>
          <Link className="text-sm text-cyan-200" href="/mini-preview">Open H5 mini-program preview</Link>
          <Link className="text-sm text-slate-400" href="/">Back to landing page</Link>
        </div>
      </div>
    </main>
  );
}
