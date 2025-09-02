"use client";
import React from "react";
import Link from "next/link";
import { useMenuStore } from "@/hooks/useMenuStore";
import { CompanyInfoType } from "@/types/CompanyInfoType";
import { stripWhitespace } from "@/utils/stripWhitespace";
import { NavEntryConfig } from "@/types/NavEntryConfigType";
import { useTranslations } from "next-intl";
import { SocialsType } from "@/types/SocialsType";
import { SocialLinks } from "./SocialLinks";
import { SmartLink } from "./shared/SmartLink";

export type NavEntry = {
  id: string;
  href: string;
  title: string;
};

type NavbarMenuProps = {
  companyInfo: CompanyInfoType;
  navEntriesMainConfig: NavEntryConfig[];
  navEntriesLegalConfig: NavEntryConfig[];
  t: ReturnType<typeof useTranslations>;
  socials?: SocialsType;
};

export default function NavbarMenu({
  companyInfo,
  navEntriesMainConfig,
  navEntriesLegalConfig,
  t,
  socials,
}: NavbarMenuProps) {
  const { close } = useMenuStore();

  const navEntriesMain: NavEntry[] = navEntriesMainConfig.map(
    ({ titleKey, ...rest }) => ({
      ...rest,
      title: String(t(titleKey) ?? ""),
    })
  );

  const navEntriesLegal: NavEntry[] = navEntriesLegalConfig.map(
    ({ titleKey, ...rest }) => ({
      ...rest,
      title: String(t(titleKey) ?? ""),
    })
  );

  return (
    <div className="w-full flex flex-col pt-6 md:pt-14 pb-8 justify-between">
      <div className="flex flex-col md:flex-row w-full gap-6 lg:gap-8">
        {/* Main */}
        <ul className="flex flex-col gap-6 lg:gap-8 w-full md:w-1/2 ">
          {navEntriesMain.map((entry) => (
            <li
              key={entry.id}
              className="text-3xl lg:text-6xl uppercase font-bold hover:text-secondary-hover"
            >
              <Link onClick={() => close()} href={entry.href}>
                {entry.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* Legal */}
        <ul className="flex flex-col gap-2 lg:gap-4 w-full md:w-1/2 ">
          {navEntriesLegal.map((entry) => (
            <li
              key={entry.id}
              className="text-xl lg:text-3xl uppercase font-bold hover:text-secondary-hover"
            >
              <SmartLink onClick={() => close()} href={entry.href}>
                {entry.title}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer contact/address unchanged */}
      <div className="flex flex-col md:flex-row w-full gap-3 md:gap-0">
        {/* Contact */}
        {(companyInfo.phone || companyInfo.email) && (
          <div className="flex flex-col w-full md:w-1/2">
            {companyInfo.email && (
              <a
                className="text-base lg:text-xl"
                href={`mailto:${companyInfo.email}`}
              >
                {companyInfo.email}
              </a>
            )}
            {companyInfo.phone && (
              <a
                className="text-base lg:text-xl"
                href={`tel:${stripWhitespace(companyInfo.phone)}`}
              >
                {companyInfo.phone}
              </a>
            )}
          </div>
        )}
        <div className="flex flex-col w-full md:w-1/2">
          <p className="text-base lg:text-xl">{companyInfo.street}</p>
          <p className="text-base lg:text-xl">{companyInfo.city}</p>
        </div>
        {socials && <SocialLinks className="w-max" socials={socials} />}
      </div>
    </div>
  );
}
