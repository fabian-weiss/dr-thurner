// types/socials.ts
import type { IconType } from "react-icons";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "x"
  | "threads"
  | "whatsapp"
  | "telegram"
  | "pinterest"
  | "reddit"
  | "github"
  | "discord"
  | "twitch"
  | "bluesky"
  | "mastodon";

export type SocialsType = Partial<
  Record<
    SocialPlatform,
    {
      href: string; // full URL
      label?: string; // optional custom label
      username?: string; // optional display handle
    }
  >
>;

export type BrandIcon = IconType;
