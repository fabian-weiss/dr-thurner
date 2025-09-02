import React from "react";
import { getMdPageHTML } from "@/lib/generate-md-pages";
import MdWrapper from "@/components/md/MdWrapper";
import { MdPageType } from "@/types/MdPageType";

async function Impressum() {
  const data: MdPageType & { contentHtml: string } = await getMdPageHTML(
    "imprint"
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
      className="min-h-screen h-auto"
      html={data.contentHtml}
    />
  );
}

export default Impressum;
