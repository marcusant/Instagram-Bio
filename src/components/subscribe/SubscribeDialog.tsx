"use client";

import { useState, type FormEvent } from "react";
import type { SubscribeConfig } from "@/types/site";
import { isValidEmail } from "@/lib/validation";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

/** Inline expanding subscribe form (no modal library — keeps the bundle tiny). */
export function SubscribeDialog({ config }: { config: SubscribeConfig }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("E-mail inválido. Confira e tente de novo.");
      return;
    }

    setStatus("loading");
    setMessage("");
    trackEvent(AnalyticsEvent.SubscribeSubmit);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(config.successMessage);
        setEmail("");
        trackEvent(AnalyticsEvent.SubscribeSuccess);
      } else {
        setStatus("error");
        setMessage(data.message ?? "Não foi possível inscrever. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Falha de rede. Tente novamente.");
    }
  }

  return (
    <section className="reveal mt-6 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-5">
      <h2 className="font-display text-2xl uppercase tracking-tight text-[var(--text)]">
        {config.title}
      </h2>
      <p className="mt-1 text-sm text-[var(--text-soft)]">{config.description}</p>

      {!open && status !== "success" && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full cursor-pointer rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[var(--accent-ink)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {config.buttonLabel}
        </button>
      )}

      {open && status !== "success" && (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2" noValidate>
          {/* Honeypot: visually hidden, off-screen, not announced. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <label htmlFor="subscribe-email" className="sr-only">
            Seu e-mail
          </label>
          <input
            id="subscribe-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[var(--surface-border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full cursor-pointer rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold uppercase tracking-wide text-[var(--accent-ink)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-100 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {status === "loading" ? "Enviando…" : config.buttonLabel}
          </button>
        </form>
      )}

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            status === "error" ? "text-[var(--danger)]" : "text-[var(--accent)]"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
