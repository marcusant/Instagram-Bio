# BIO-Instagram

Link da bio do Instagram do **Marcus Santos** — um "link na bio" autoral
(estilo Linktree/Beacons), **config-driven** e com visual dark atlético/fitness.
Construído para substituir o Beacons por uma página própria, sob domínio próprio.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · `next-themes` · `zod` ·
Vercel Analytics · deploy na Vercel.

## Recursos

- ⚙️ **Config-driven** — gerencie tudo em `src/config/site.ts`.
- 🎨 **Dark atlético** com toggle claro/escuro (sem flash).
- 🔗 **Botões de link** com variante de destaque (cupom) e ícones.
- 📈 **Rastreamento de cliques** por link/rede (Vercel Analytics).
- ✉️ **Captura de e-mail** (`/api/subscribe`, provider-agnóstico).
- 🔍 **SEO + Open Graph** dinâmico (imagem de preview, sitemap, robots, manifest).
- ♿ Acessível e responsivo, respeitando `prefers-reduced-motion`.

## Começar

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editar seus links

Abra **`src/config/site.ts`** e edite `profile`, `socials` e `links`.
Para trocar a foto, coloque o arquivo em `public/` e ajuste `profile.avatar`.
Detalhes e convenções: ver [`CLAUDE.md`](./CLAUDE.md).

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui type-check) |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes e2e (Playwright) |

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. A captura de e-mail é opcional — sem
provider configurado, o formulário funciona como no-op gracioso.

## Deploy

1. Suba para um repositório no GitHub.
2. Importe o repo na [Vercel](https://vercel.com/new) — detecta Next.js sozinho.
3. (Opcional) Configure as variáveis de ambiente e o domínio.
4. Auto-deploy a cada push na branch principal.
