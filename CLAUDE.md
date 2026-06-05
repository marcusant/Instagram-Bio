# BIO-Instagram — Regras do Projeto

Link da bio do Instagram do Marcus Santos. **Config-driven**: todo o conteúdo
(perfil, links, redes, tema, SEO) vive em **um único arquivo**, e os componentes
apenas o renderizam.

> Estas regras existem para você (Claude) e o Marcus não precisarem repetir stack,
> fluxo e convenções a cada sessão. Leia antes de mexer no projeto.

## Stack (FIXA — não trocar sem pedido explícito)

| Camada | Ferramenta |
|--------|------------|
| Framework | Next.js 15 (App Router) + React 19 |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS v4 + design tokens oklch em `src/app/globals.css` |
| Tema | `next-themes` (classe `.dark` no `<html>`) |
| Validação | `zod` |
| Analytics | `@vercel/analytics` (wrapper em `src/lib/analytics.ts`) |
| Testes | Vitest (unit em `src/**`) + Playwright (e2e em `e2e/`) |
| Deploy | Vercel (auto-deploy via Git) · domínio grátis `*.vercel.app` |

## Fluxo de trabalho (IMPORTANTE)

1. **Local primeiro.** Toda mudança é construída e validada localmente
   (`npm run dev`, `npm run build`, `npm test`) **antes** de qualquer commit.
2. **Nunca commitar/pushar sem autorização explícita** do Marcus
   (ex.: "pode commitar"). Preparar e propor, mas parar e esperar o OK.
3. Só depois de aprovado o local: `git` → GitHub → Vercel (auto-deploy).

## Como o Marcus gere os links (fonte de verdade)

Edite **somente** `src/config/site.ts`:

- **Adicionar link**: novo objeto em `links` (`id` único, `label`, `href`,
  opcional `subtitle`, `icon`, `featured`).
- **Esconder sem apagar**: `enabled: false`.
- **Destacar** (acento de cor, ex. cupom): `featured: true`.
- **Trocar foto**: ponha o arquivo em `public/` e ajuste `profile.avatar`.
- **Redes sociais**: edite `socials`.
- **SEO/domínio**: ajuste `seo.url` para o domínio final na Vercel.

Ícones disponíveis: ver registry em `src/components/icons/index.tsx`
(`instagram`, `tiktok`, `youtube`, `whatsapp`, `tag`, `play`, `email`,
`website`, `link`). Para um ícone novo, adicione ao registry.

## Convenções de código

- Componentes em PascalCase, organizados por feature em `src/components/<feature>/`.
- Server Components por padrão; `"use client"` só quando há estado/eventos.
- Sem cores/spacings hardcoded: use os tokens CSS (`var(--accent)`, etc.).
- Animar só `transform`/`opacity`; respeitar `prefers-reduced-motion`.
- HTML semântico + `aria-label` + `focus-visible` em tudo interativo.
- Nada de segredo no código — use `.env.local` (ver `.env.example`).

## Comandos

```bash
npm run dev        # servidor local (http://localhost:3000)
npm run build      # build de produção (roda type-check)
npm run typecheck  # só os tipos
npm test           # Vitest (unit)
npm run test:e2e   # Playwright (e2e) — usa o servidor da porta 3000
```

## Captura de e-mail

`POST /api/subscribe` valida com zod e encaminha a um provider **se** configurado
via env (`SUBSCRIBE_WEBHOOK_URL` **ou** `RESEND_API_KEY` + `RESEND_AUDIENCE_ID`).
Sem provider, faz no-op gracioso (a UX funciona). Tem honeypot + rate-limit simples.

## Imagens dinâmicas (OG / favicon)

`src/app/opengraph-image.tsx` e `src/app/icon.tsx` usam `next/og` no
**runtime edge** (`export const runtime = "edge"`). Isso é proposital: evita um
bug de build do `@vercel/og` no Windows. **Não remover** o `runtime = "edge"`.

## Notas de teste/qualidade

- Para UI visual, priorizamos smoke/visual (Playwright) + unit no `src/lib` e no
  config, em vez de asserts frágeis de markup (regra web ECC). O alvo de 80% se
  aplica à lógica (`lib/`, `api/`, config), não a componentes puramente visuais.
- `First Load JS` da home ~129 kB (React 19 + themes + analytics). Acima do budget
  "microsite" de 80 kB do ECC, mas dentro do esperado para Next; manter enxuto.
