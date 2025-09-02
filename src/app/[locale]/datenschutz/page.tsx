import MdWrapper from "@/components/md/MdWrapper";
import { getMdPageHTML } from "@/lib/generate-md-pages";
import { MdPageType } from "@/types/MdPageType";
import React from "react";

async function PrivacyPage() {
  const data: MdPageType & { contentHtml: string } = await getMdPageHTML(
    "privacy"
  );
  return (
    <MdWrapper
      content={{
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        imageSrc: data.imageSrc,
        imageAlt: data.imageAlt,
      }}
      html={data.contentHtml}
    />
  );
}

export default PrivacyPage;
