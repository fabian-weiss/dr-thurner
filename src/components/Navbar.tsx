"use client";

import { NavbarAppearance } from "@/constants/enums";
import { BaseComponentProps } from "@/types/base";
import { useSwipeStore } from "@/store/useSwipeStore";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { cn } from "@/utils/cn";
import { useMenuStore } from "@/hooks/useMenuStore";
import { AnimatedMenuButton } from "./AnimatedMenuButton";
import { MagneticWrapper } from "./MagneticWrapper";
import NavbarMenu from "./NavbarMenu";
import { NavEntryConfig } from "@/types/NavEntryConfigType";
import { CompanyInfoType } from "@/types/CompanyInfoType";
import { useTranslations } from "next-intl";
import { useCloseMenuOnDesktop } from "@/hooks/useCloseMenuOnDesktop";
import { SocialsType } from "@/types/SocialsType";
import { Link, usePathname } from "@/i18n/navigation";
import Button from "./Button";

export type NavbarProps = {
  appearance?: NavbarAppearance;
  logoSrc?: string;
  navEntriesMainConfig: NavEntryConfig[];
  navEntriesLegalConfig: NavEntryConfig[];
  companyInfo: CompanyInfoType;
  tKey: string;
  socials?: SocialsType;
  hideNavMenu?: boolean;
  alwaysShowNavMenu?: boolean;
  enableChildrenMobile?: boolean;
  burgerButtonClassName?: string;
};

export default function Navbar({
  appearance = NavbarAppearance.DEFAULT,
  logoSrc,
  children,
  navEntriesMainConfig,
  navEntriesLegalConfig,
  companyInfo,
  tKey,
  socials,
  hideNavMenu = false,
  enableChildrenMobile = false,
  alwaysShowNavMenu = false,
  className,
  burgerButtonClassName,
}: BaseComponentProps<NavbarProps>) {
  const pathname = usePathname();

  // normalize path: strip locale prefix like /de/, /en-US/, etc., and trailing slash
  const normalizedPath =
    pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?\//, "/").replace(/\/$/, "") ||
    "/";

  const legalPaths = ["/impressum", "/datenschutz", "/imprint", "/privacy"];
  const forceShowNavMenu =
    alwaysShowNavMenu || legalPaths.some((p) => normalizedPath === p);

  // If you want the menu to stay available on desktop for legal pages, don't auto-close there:
  useCloseMenuOnDesktop(forceShowNavMenu ? Number.POSITIVE_INFINITY : 1024);

  const { currentPage, previousPage, isDark, scrollDir } = useSwipeStore();
  const { isOpen } = useMenuStore();

  // If you really want to HIDE the navbar on english legal pages only, keep this;
  // otherwise remove this whole block.
  const isHidden = ["imprint", "privacy"].some((s) =>
    normalizedPath.toLowerCase().includes(s)
  );

  const t = useTranslations(tKey);
  const isScrollingUp = scrollDir === "up";

  const shouldShow = (() => {
    // >>> Ensure we show navbar on legal pages
    if (forceShowNavMenu) return true;

    if (isHidden) return false;
    if (appearance === NavbarAppearance.FIXED) return true;
    if (appearance === NavbarAppearance.DEFAULT) return currentPage === 0;

    if (appearance === NavbarAppearance.UPWARDS_SCROLL) {
      return isScrollingUp || currentPage === 0 || currentPage < previousPage;
    }
    return false;
  })();

  const spring = { type: "spring" as const, stiffness: 320, damping: 28 };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="navbar"
          initial={{ y: -80, opacity: 0, height: "var(--navbar-height)" }}
          animate={{
            y: 0,
            opacity: 1,
            height: isOpen ? "100dvh" : "var(--navbar-height)",
          }}
          exit={{ y: -80, opacity: 0, height: "var(--navbar-height)" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(
            "fixed top-0 left-0 w-full z-50 h-[var(--navbar-height)] overflow-hidden",
            {
              "bg-primary text-text-light h-dvh": isOpen,
              absolute: appearance === NavbarAppearance.DEFAULT,
            },
            className
          )}
          style={{ willChange: "height, transform" }}
        >
          <div className="fw-px-section flex items-center justify-between w-full h-[var(--navbar-height)]">
            {logoSrc && (
              <Link href="/" className="flex items-center">
                <Logo src={logoSrc} isDark={isDark} />
              </Link>
            )}
            <div
              className={cn("hidden lg:flex gap-4", {
                block: enableChildrenMobile,
                "lg:hidden": forceShowNavMenu,
              })}
            >
              <div>
                {navEntriesMainConfig.map((entry) => (
                  <Button
                    key={entry.id}
                    href={entry.href}
                    size="lg"
                    appearance="ghost"
                    className="text-text-light"
                  >
                    {t(entry.titleKey)}
                  </Button>
                ))}
                {children}
                {/* <Button href="#kontakt" size="lg" appearance="primary">
                Kontakt
              </Button> */}
              </div>
            </div>
            <div
              className={cn("block lg:hidden", {
                hidden: hideNavMenu,
                "block lg:block": forceShowNavMenu,
              })}
            >
              <MagneticWrapper showOutline>
                <AnimatedMenuButton
                  className={cn(
                    !isDark && !isOpen ? "text-text-dark" : "text-text-light",
                    burgerButtonClassName
                  )}
                />
              </MagneticWrapper>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={spring}
                className="bg-primary flex w-full fw-px-section"
                style={{ height: "calc(100dvh - var(--navbar-height))" }}
              >
                <NavbarMenu
                  socials={socials}
                  companyInfo={companyInfo}
                  navEntriesMainConfig={navEntriesMainConfig}
                  navEntriesLegalConfig={navEntriesLegalConfig}
                  t={t}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
