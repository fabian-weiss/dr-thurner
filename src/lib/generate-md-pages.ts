import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MdPageType } from "@/types/MdPageType";

const getMdPagesDirectory = () => path.join(process.cwd(), `/src/md-pages`);

export function getMdPageData() {
  // Get file names under /legal
  const fileNames = fs.readdirSync(getMdPagesDirectory());
  const allMdPages = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(getMdPagesDirectory(), fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    const mdPage: MdPageType = {
      id: id,
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      imageSrc: matterResult.data.imageSrc,
      imageAlt: matterResult.data.imageAlt,
    };
    return mdPage;
  });
  return allMdPages;
}

export const getMdPageHTML = async (
  id: string
): Promise<MdPageType & { contentHtml: string }> => {
  const fullPath = path.join(getMdPagesDirectory(), `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const md: string = matterResult.content;

  const mdPageWithHTML: MdPageType & { contentHtml: string } = {
    id,
    title: matterResult.data.title,
    subtitle: matterResult.data.subtitle,
    imageSrc: matterResult.data.imageSrc,
    imageAlt: matterResult.data.imageAlt,
    contentHtml: md,
  };

  // Combine the data with the id
  return mdPageWithHTML;
};
