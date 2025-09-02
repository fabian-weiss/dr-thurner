// lib/socials-helpers.ts
import { SOCIAL_PLATFORM_CONFIG } from "@/lib/social-platform-config";
import { SocialPlatform, SocialsType } from "@/types/SocialsType";

export function getRenderableSocials(socials: SocialsType) {
  const entries = Object.entries(socials) as [
    SocialPlatform,
    NonNullable<SocialsType[SocialPlatform]>
  ][];
  return entries
    .filter(([, v]) => Boolean(v?.href))
    .map(([platform, v]) => {
      const { Icon, label } = SOCIAL_PLATFORM_CONFIG[platform];
      return {
        platform,
        href: v.href,
        label: v.label ?? label,
        username: v.username,
        Icon,
      };
    });
}
