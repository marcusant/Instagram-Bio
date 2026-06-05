import type { SiteConfig } from "@/types/site";

/**
 * ⭐ FONTE DE VERDADE DO LINK DA BIO ⭐
 *
 * Para gerir o seu link da bio, edite SOMENTE este arquivo:
 *  - Trocar foto:     profile.avatar (coloque o arquivo em /public)
 *  - Adicionar link:  acrescente um objeto em `links`
 *  - Esconder link:   `enabled: false` (sem apagar)
 *  - Destacar link:   `featured: true` (ganha o acento de cor)
 *  - Redes sociais:   edite `socials`
 *
 * Nenhum componente precisa ser tocado.
 */
export const site: SiteConfig = {
  profile: {
    name: "Marcus Santos",
    handle: "marcus.santosc",
    avatar: "/avatar.png",
    pillars: ["Corpo ativo", "Mente clara", "Essência desperta"],
    verified: true,
  },

  socials: [
    { platform: "tiktok", href: "https://www.tiktok.com/@marcus.santosc", label: "TikTok de Marcus" },
    { platform: "instagram", href: "https://www.instagram.com/marcus.santosc", label: "Instagram de Marcus" },
    { platform: "youtube", href: "https://www.youtube.com/@marcus.santosc", label: "YouTube de Marcus" },
  ],

  links: [
    {
      id: "whatsapp",
      label: "Fala comigo",
      subtitle: "Tire suas dúvidas no WhatsApp",
      href: "https://wa.me/5567999919646",
      icon: "whatsapp",
    },
    {
      id: "cupom-marcusantos",
      label: "Zumub · 10% OFF",
      subtitle: "Cupom MARCUSANTOS · suplementos",
      href: "http://zumu.be/marcusantos",
      icon: "zumub",
      featured: true,
    },
    {
      id: "youtube",
      label: "YouTube",
      subtitle: "Treinos e dicas toda semana",
      href: "https://www.youtube.com/@marcus.santosc",
      icon: "youtube",
    },
  ],

  subscribe: {
    enabled: true,
    title: "Receba conteúdo exclusivo",
    description: "Entre na lista e receba treinos e dicas direto no seu e-mail.",
    buttonLabel: "Quero receber",
    successMessage: "Pronto! Você está na lista. 💪",
  },

  theme: {
    defaultMode: "dark",
    allowToggle: true,
  },

  seo: {
    title: "Marcus Santos — Personal Trainer",
    description:
      "Links, treinos, cupons e contato do Marcus Santos. Personal trainer especialista no Método 40+.",
    // Ajuste para o domínio final na Vercel (sem barra no fim).
    url: "https://instagram-bio-teal.vercel.app",
  },
};

/** Apenas links habilitados, na ordem do config. */
export const activeLinks = site.links.filter((link) => link.enabled !== false);
