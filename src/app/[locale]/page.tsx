"use client";
import SectionWrapper from "@/components/SectionWrapper";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSwipeStore } from "@/store/useSwipeStore";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { stripWhitespace } from "@/utils/stripWhitespace";
import BoxedContent from "@/components/BoxedContent";
import AccordionGroup from "@/components/AccordionGroup";
import ContentWrapper from "@/components/ContentWrapper";
import { MediaFormat } from "@/constants/enums";
import {
  PiArrowLeft,
  PiArrowRight,
  PiDeviceMobile,
  PiEnvelope,
  PiMapPin,
} from "react-icons/pi";
import Bubble from "@/components/Bubble";
import ContentCard from "@/components/ContentCard";
import CustomCarousel from "@/components/CustomCarousel";
import ImageGrid from "@/components/ImageGrid";
import InfoBox from "@/components/InfoBox";
import {
  companyInfoDieThurner,
  servicesDieThurner,
  imagesDieThurner,
  aboutDieThurner,
  faqsDieThurner,
  navEntriesLegalConfigDieThurner,
} from "@/data/die_thurner";
import FullscreenSliderSection from "@/sections/FullScreenSliderSection";
import RichText from "@/components/RichText";

/* PAGE STRUCTURE */
/* Fullscreen Logo with address */
/* Menu */
/* Opening hours and imprint */

export default function DieThurnerPage() {
  const ID: string = "die-thurner-swipe-shell";
  const pathname = usePathname(); // route-based key
  const key = `${pathname}::${ID}`; // robust per-route per-slider key
  const t = useTranslations("NAVIGATION");

  const { currentPage, setRememberedPage } = useSwipeStore();

  // read synchronously once for initial render – this avoids “always 0”

  // persist genuine user changes
  useEffect(() => {
    setRememberedPage(key, currentPage);
  }, [currentPage, key, setRememberedPage]);
  return (
    <>
      <FullscreenSliderSection
        // className="max-h-[90svh]"
        desktopSlides={[
          {
            showBottomFade: true,
            items: [
              {
                media: {
                  type: MediaFormat.IMAGE,
                  src: "/die_thurner/thurner1.webp",
                  alt: "Die Thurner Hero",
                },
                content: (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 text-white z-10 fw-px-section">
                    <RichText
                      titleAs={"h1"}
                      descriptionClassName="max-w-3xl"
                      className="text-center! items-center! justify-center! relative z-10"
                      title="Pferde-Chiropraktik Dr. Marion Thurner"
                      description="Ganzheitliche Behandlung für Sport- und Freizeitpferde in 1190 Wien: Blockaden lösen, Beweglichkeit fördern und Regeneration unterstützen – für Gesundheit und Wohlbefinden Ihres Pferdes."
                      buttons={[
                        {
                          children: "Termin vereinbaren",
                          appearance: "primary",
                          href: "#kontakt",
                          size: "lg",
                        },
                      ]}
                    />
                  </div>
                ),
              },
            ],
          },
        ]}
      ></FullscreenSliderSection>
      <div className="fw-py-section">
        <SectionWrapper id="leistungen" className="flex-row">
          <ContentWrapper className="flex gap-12 flex-col lg:flex-row">
            <RichText
              className="flex-6"
              title="Warum Vorsorge der Schlüssel zur Pferdegesundheit ist"
              description="Gesundheit beginnt mit Aufmerksamkeit. Viele Erkrankungen entwickeln sich schleichend – oft bleiben erste Anzeichen unbemerkt. Mit regelmäßigen Vorsorgeuntersuchungen, Impfungen und individuellen Entwurmungsplänen können wir Probleme frühzeitig erkennen, Therapien rechtzeitig einleiten und Ihrem Pferd unnötiges Leid ersparen. So bleibt es lange gesund, leistungsfähig und Sie genießen die gemeinsame Zeit unbeschwert."
              descriptionClassName="lg:max-w-2xl"
            ></RichText>
            <div className="lg:flex-4 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-12 justify-center items-center">
              <InfoBox
                className="bg-white text-text-dark border border-border rounded-xl w-full"
                headerBoxClassName="bg-primary text-text-light"
                title="Ordinationszeiten & Kontakt"
              >
                <p className="text-h5">Dr. Marion Thurner</p>
                <p>{"Fachärztin für Chiropraktik"}</p>
                <div className="flex gap-2 items-center">
                  <PiMapPin />
                  <p>{`${companyInfoDieThurner.street}, ${companyInfoDieThurner.city}`}</p>
                </div>
                <p className="font-bold mt-4">{"Termine nach Vereinbarung"}</p>
                <div className="flex items-center gap-2">
                  <PiDeviceMobile />
                  <a
                    className="underline"
                    href={`tel:${stripWhitespace(
                      companyInfoDieThurner.mobile ?? ""
                    )}`}
                  >
                    {`${companyInfoDieThurner.mobile}`}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <PiEnvelope />
                  <a
                    className="underline"
                    href={`mailto:${stripWhitespace(
                      companyInfoDieThurner.email ?? ""
                    )}`}
                  >
                    {`${companyInfoDieThurner.email}`}
                  </a>
                </div>
              </InfoBox>
            </div>
          </ContentWrapper>
        </SectionWrapper>
        <SectionWrapper id="leistungen-2">
          <div className="fw-content-wrapper">
            <RichText
              className="mb-6"
              title="Alle Leistungen im Überblick"
              description="Neben umfassender Vorsorge biete ich Ihnen das gesamte Spektrum moderner Pferdechiropraktik:"
            />
          </div>
          <CustomCarousel
            maxVisibleSlides={3}
            showArrows={true}
            ignoreTeaserOffset={false}
            customRightArrow={<PiArrowRight size={18} />}
            customLeftArrow={<PiArrowLeft size={18} />}
            enableSnap={true}
            arrowPosition="floating"
          >
            {servicesDieThurner.map((service, index) => (
              <ContentCard
                className="min-h-[360px] flex flex-col justify-end"
                key={`service-die-thurner-${index}`}
                title={service.title}
                description={service.description}
                background="url('/die_thurner/thurner1.webp')"
                enableHoverEffect={false}
                showOverlay
              />
            ))}
          </CustomCarousel>
        </SectionWrapper>
      </div>
      <SectionWrapper id="images">
        <ImageGrid className="fw-py-section" {...imagesDieThurner} />
      </SectionWrapper>
      <SectionWrapper id="ueber">
        <ContentWrapper className="h-full flex items-center justify-center flex-col gap-4">
          <BoxedContent
            className="text-text-dark"
            title="Über mich"
            description="Ich bin Doktorin der Veterinärmedizin mit Spezialisierung auf Chiropraktik beim Pferd. Nach meiner Promotion in Wien sammelte ich Erfahrung in nationalen und internationalen Praxen, bevor ich 2003 meine Ausbildung in den USA abschloss und mich seither ganz der Pferdepraxis widme. Internationale Zertifizierungen und die Mitarbeit in Fachgremien unterstreichen meine langjährige Expertise."
            content={
              <div className="flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start">
                {aboutDieThurner.map((bubble, index) => {
                  return <Bubble key={index} text={bubble} border />;
                })}
              </div>
            }
            reverse
            rightContent={
              <div className="w-full h-full relative flex items-center justify-center">
                {/* Right content goes here */}
                <Image
                  src={"/die_thurner/thurner1.webp"}
                  alt="Pferd"
                  fill
                  className="object-cover"
                />
              </div>
            }
            backgroundColor="#fff"
          />
        </ContentWrapper>
      </SectionWrapper>
      <SectionWrapper className="faq">
        <ContentWrapper className="flex flex-col gap-8 w-full fw-content-wrapper__narrow">
          <div className="flex-1 grow">
            <RichText className="mb-6" title={"FAQs"} />
            <AccordionGroup items={faqsDieThurner} />
          </div>
        </ContentWrapper>
      </SectionWrapper>
      <SectionWrapper id="kontakt">
        <ContentWrapper className="h-full flex items-center justify-center flex-col gap-4">
          <BoxedContent
            showOverlay
            contentLayout="horizontal"
            className="text-text-light lg:min-h-[600px]"
            title="Kontakt"
            showBottomFade
            subtitle="Ich weiß, wie sehr Sie Ihr Pferd lieben. Deshalb ist es mein Anspruch, dass Sie sich in jeder Situation gut aufgehoben fühlen."
            content={
              <div className="flex flex-col">
                <p>Einsatzgebiet: Wien und angrenzende Bezirke</p>
                <p>Standort: 1190 Wien</p>
              </div>
            }
            backgroundImage={{
              fill: true,
              src: "/die_thurner/thurner2.webp",
              alt: "Pferd",
            }}
            buttons={[
              {
                children: "Jetzt kontaktieren",
                href: `tel:${stripWhitespace(
                  companyInfoDieThurner.mobile ?? ""
                )}`,
                appearance: "secondary",
                size: "lg",
              },
            ]}
            overlay={
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/25 text-white"></div>
            }
            // rightContent={
            //   <div className="w-full h-full relative flex items-center justify-center">
            //     {/* Right content goes here */}
            //     <Image
            //       src={"/zach/zach1.webp"}
            //       alt="Pferd"
            //       fill
            //       className="object-cover"
            //     />
            //   </div>
            // }
            // backgroundColor="#fff"
          />
        </ContentWrapper>
      </SectionWrapper>
      <SectionWrapper isDark id="footer">
        <div className="fw-content-wrapper w-full py-4">
          {/* Legal */}
          <div className="flex gap-2 lg:gap-4 w-full items-center justify-center">
            {navEntriesLegalConfigDieThurner.map((entry) => (
              <Link
                href={entry.href}
                key={entry.id}
                className="hover:text-secondary-hover"
              >
                {t(entry.titleKey)}
              </Link>
            ))}
          </div>
        </div>
        {/* <SocialLinks socials={socialsZach} /> */}
      </SectionWrapper>
    </>
  );
}
