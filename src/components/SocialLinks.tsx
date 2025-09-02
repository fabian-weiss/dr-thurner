// components/SocialLinks.tsx

import { Link } from "@/i18n/navigation";
import { getRenderableSocials } from "@/lib/socials-helper";
import { SocialsType } from "@/types/SocialsType";

type Props = {
  socials: SocialsType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
};

const SIZE_NUM = { sm: 16, md: 20, lg: 24 } as const;

export function SocialLinks({
  socials,
  size = "md",
  showLabel = false,
  className,
}: Props) {
  const items = getRenderableSocials(socials);
  if (!items.length) return null;

  return (
    <ul
      className={[
        "flex flex-wrap items-center gap-3 justify-center h-max",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map(({ platform, href, label, Icon, username }) => (
        <li className="flex" key={platform}>
          <Link
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-current justify-center"
          >
            <Icon size={SIZE_NUM[size]} aria-hidden />
            {showLabel && (
              <span className="text-sm">
                {username ? `${label} · ${username}` : label}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
