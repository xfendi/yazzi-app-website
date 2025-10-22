"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterInput() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email");

    setLoading(true);
    const toastId = toast.loading("Subscribing...");

    try {
      const res = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Subscribed successfully! 🎉", { id: toastId });
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to subscribe", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className={`flex items-center gap-2 w-full max-w-sm transition-all duration-300 ${loading && "opacity-50"}`}
    >
      <input
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
      />
      <button type="submit" disabled={loading} className="btn-outline light">
        Submit
      </button>
    </form>
  );
}
