// lib/social-platform-config.tsx

import { SocialPlatform, BrandIcon } from "@/types/SocialsType";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiLinkedin,
  SiX,
  SiThreads,
  SiWhatsapp,
  SiTelegram,
  SiPinterest,
  SiReddit,
  SiGithub,
  SiDiscord,
  SiTwitch,
  SiBluesky,
  SiMastodon,
} from "react-icons/si";

export const SOCIAL_PLATFORM_CONFIG: Record<
  SocialPlatform,
  { label: string; Icon: BrandIcon }
> = {
  facebook: { label: "Facebook", Icon: SiFacebook },
  instagram: { label: "Instagram", Icon: SiInstagram },
  tiktok: { label: "TikTok", Icon: SiTiktok },
  youtube: { label: "YouTube", Icon: SiYoutube },
  linkedin: { label: "LinkedIn", Icon: SiLinkedin },
  x: { label: "X (Twitter)", Icon: SiX },
  threads: { label: "Threads", Icon: SiThreads },
  whatsapp: { label: "WhatsApp", Icon: SiWhatsapp },
  telegram: { label: "Telegram", Icon: SiTelegram },
  pinterest: { label: "Pinterest", Icon: SiPinterest },
  reddit: { label: "Reddit", Icon: SiReddit },
  github: { label: "GitHub", Icon: SiGithub },
  discord: { label: "Discord", Icon: SiDiscord },
  twitch: { label: "Twitch", Icon: SiTwitch },
  bluesky: { label: "Bluesky", Icon: SiBluesky },
  mastodon: { label: "Mastodon", Icon: SiMastodon },
};
