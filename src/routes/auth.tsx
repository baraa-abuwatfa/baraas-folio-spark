import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | Baraa" },
      { name: "description", content: "Administrator sign-in for Baraa’s portfolio." },
      { property: "og:title", content: "Admin Sign In | Baraa" },
      { property: "og:description", content: "Administrator sign-in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage("Sign-in failed. Check your email and password.");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      setMessage("Check your email to confirm your account, then sign in.");
    }
  }
  return (
    <section className="section reveal" dir="ltr">
      <div className="container max-w-md">
        <span className="section-kicker">PRIVATE AREA</span>
        <h1 className="page-title">{mode === "signin" ? "Admin sign in" : "Create admin account"}</h1>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" minLength={8} required autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {message && <p role="status" className="text-sm">{message}</p>}
          <Button type="submit" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
          <button type="button" className="text-link justify-self-start" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
            {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
