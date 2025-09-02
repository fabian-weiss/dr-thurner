import { ContentCardProps } from "@/components/ContentCard";
import { ImageGridProps } from "@/components/ImageGrid";
import { AccordionItemType } from "@/types/AccordionItemType";
import { CompanyInfoType } from "@/types/CompanyInfoType";
import { NavEntryConfig } from "@/types/NavEntryConfigType";

/* COMPANY INFO */
export const companyInfoDieThurner: CompanyInfoType = {
  name: "Dr. Marion Thurner",
  street: "Pfarrwiesengasse 4/1",
  city: "1190 Wien",
  email: "office@diethurner.at",
  mobile: "+43 676 731 71 31",
};

/* NAV ENTRIES */
export const navEntriesMainConfigDieThurner: NavEntryConfig[] = [
  { id: "contact", href: "/#kontakt", titleKey: "CONTACT" },
  {
    id: "about",
    href: "/#ueber",
    titleKey: "ABOUT",
  },
  {
    id: "services",
    href: "/#leistungen",
    titleKey: "SERVICES",
  },
];

export const navEntriesLegalConfigDieThurner: NavEntryConfig[] = [
  { id: "imprint", href: "/impressum", titleKey: "IMPRINT" },
  { id: "privacy", href: "/datenschutz", titleKey: "PRIVACY" },
];

/* SERVICES */
export const servicesDieThurner: ContentCardProps[] = [
  {
    title: "Myofasziale Integration",
    description:
      "Behandlung von Verklebungen, Verdickungen oder Flüssigkeitsverlusten der Faszien mit gezielten Tiefengewebe-Techniken. Stellt die strukturelle Integrität des Körpers wieder her.",
  },
  {
    title: "Faszien-Therapie",
    description:
      "Faszien durchziehen den gesamten Körper als elastisches Netz. Ihre Behandlung verbessert Beweglichkeit, Stabilität und das ganzheitliche Wohlbefinden des Pferdes.",
  },
  {
    title: "Akupunktur",
    description:
      "Traditionelle chinesische Medizin mit Nadeln an spezifischen Punkten, um den Energiefluss („Qi“) in den Meridianen auszugleichen und Heilungsprozesse zu fördern.",
  },
  {
    title: "Unterstützung der Chiropraktik",
    description:
      "Akupunktur ergänzt die chiropraktische Behandlung wirkungsvoll und steigert deren Effektivität.",
  },
  {
    title: "Immunsystem & Regeneration",
    description:
      "Stärkt das Immunsystem und beschleunigt die Regeneration nach Verletzungen oder Zerrungen durch Förderung der Wundheilung.",
  },
  {
    title: "Chronische Prozesse",
    description:
      "Unterstützung bei Stoffwechselproblemen und chronischen Erkrankungen wie Hautveränderungen oder Sommerekzemen.",
  },
  {
    title: "Schmerztherapie",
    description:
      "Wirksame Schmerzbehandlung bei akuter und chronischer Lahmheit (z. B. Arthrose, Sehnenentzündung, Hufrolle, Hufrehe).",
  },
];

// export const servicesZach: string[] = [
//   "Impfungen/Entwurmungen",
//   "Vorsorgeuntersuchungen",
//   "Notversorgung",
//   "Blutbefunde",
//   "Digitales Röntgen",
//   "Ultraschall",
//   "Laserbehandlungen (Level IV)",
//   "Chirurgie",
//   "Innere Medizin",
//   "Dermatologie und Allergiescreening",
//   "Orthopädie",
//   "Gynäkologie",
//   "Endoskopie",
//   "Geriatrie",
//   "Homöopathie",
//   "elektronische Tierkennzeichnung (Mikrochip und EU-Pass)",
//   "Beratung in Verhaltensfragen",
//   "Ernährungsberatung",
//   "Hausapotheke",
//   "Ambulante Pferdepraxis (Notfälle, Orthopädie, Innere Medizin, Endoskopie, Ultraschall, Sportmedizin)",
//   "Impfungen",
//   "Reiseinformationen",
//   "Zusammenarbeit mit zahlreichen Experten",
// ];

/** IMAGES */
export const imagesDieThurner: ImageGridProps = {
  images: [
    {
      src: "/die_thurner/thurner1.webp",
      alt: "Image 1",
      span: 4,
    },
    {
      src: "/die_thurner/thurner2.webp",
      alt: "Image 2",
      span: 2,
    },
    {
      src: "/die_thurner/thurner3.webp",
      alt: "Image 3",
      span: 2,
    },
    {
      src: "/die_thurner/thurner4.webp",
      alt: "Image 4",
      span: 4,
    },
  ],
};

/** ABOUT */
export const aboutDieThurner: string[] = [
  "🐴 Pferde-Chiropraktik seit über 20 Jahren",
  "🌍 Internationale Erfahrung & Ausbildung (USA, Kanada, Schweden)",
  "✅ Zertifiziert durch AVCA & IVCA",
  "🎓 Mitglied internationaler Prüfungskommissionen",
];

/** FAQS */
export const faqsDieThurner: AccordionItemType[] = [
  {
    id: "faq-1",
    title: "Ersetzt Chiropraktik die Schulmedizin?",
    content:
      "Nein. Chiropraktik ersetzt nicht die Schulmedizin, sondern ergänzt sie sinnvoll. Ziel ist es, durch gezielte Manipulation die Beweglichkeit der Gelenke zu optimieren und das Nervensystem in seiner Arbeit zu unterstützen. So kann der Körper Schäden reparieren, ihnen vorbeugen und wieder ideal funktionieren.",
  },
  {
    id: "faq-2",
    title: "Woher kommt die Chiropraktik?",
    content:
      "Der Begriff stammt aus dem Griechischen und bedeutet „mit den Händen behandeln“. Erste Anwendungen sind über 5000 Jahre alt – zunächst ausschließlich am Menschen. Dass sie wirkt, weiß man schon lange; die wissenschaftliche Erklärung dafür kennt man seit dem 20. Jahrhundert.",
  },
  {
    id: "faq-3",
    title: "Wie wirkt Chiropraktik?",
    content:
      "Die Wirkung lässt sich über das Nervensystem erklären, das alle Vorgänge im Körper steuert. Funktionsstörungen an der Wirbelsäule oder im Bewegungsapparat können Schmerzen, Bewegungseinschränkungen und auch Beeinträchtigungen der Organe verursachen. Durch Chiropraktik werden Blockaden gelöst und die Gesundheit sowie Leistungsfähigkeit des gesamten Organismus unterstützt.",
  },
  {
    id: "faq-4",
    title: "Wo wird Chiropraktik angewendet?",
    content:
      "Im Zentrum steht die Wirbelsäule, die sowohl Schutz für das Rückenmark als auch Beweglichkeit für den Körper bietet. Gesunde Gelenke und Bandscheiben sind dafür entscheidend – Einschränkungen können hier vielfältige Probleme verursachen.",
  },
  {
    id: "faq-5",
    title: "Wie läuft eine chiropraktische Behandlung ab?",
    content:
      "Die Wirbelsäule hat rund 200 Gelenke. Ist die Beweglichkeit eines Gelenks eingeschränkt, spricht man von einer Blockade. Der Chiropraktor diagnostiziert diese Stellen und löst sie durch gezielte Impulse mit spezieller Kraft und Richtung. Gelenkskapseln und Bänder werden dabei nicht gedehnt oder geschädigt.",
  },
];
