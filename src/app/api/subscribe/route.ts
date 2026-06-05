import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validation";

export const runtime = "nodejs";

/** In-memory, best-effort rate limit (per warm instance). Good enough for a microsite. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

/**
 * Forwards the email to a provider when configured. Provider-agnostic:
 *  - SUBSCRIBE_WEBHOOK_URL  → POST { email } to any endpoint (Zapier, Make, n8n…)
 *  - RESEND_API_KEY + RESEND_AUDIENCE_ID → add a contact to a Resend audience
 * If nothing is configured, returns true (graceful no-op) so the UX still works.
 */
async function forwardSubscription(email: string): Promise<boolean> {
  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "bio-instagram" }),
    });
    return res.ok;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey && audienceId) {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    return res.ok;
  }

  // No provider configured yet — accept gracefully so the form still feels alive.
  console.info(`[subscribe] (no provider configured) would store: ${email}`);
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Tente de novo em um minuto." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requisição inválida." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  // Honeypot tripped → pretend success without doing anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const forwarded = await forwardSubscription(parsed.data.email);
    if (!forwarded) {
      return NextResponse.json(
        { ok: false, message: "Não foi possível inscrever agora. Tente mais tarde." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] forward failed", error);
    return NextResponse.json(
      { ok: false, message: "Erro inesperado. Tente novamente." },
      { status: 500 },
    );
  }
}
