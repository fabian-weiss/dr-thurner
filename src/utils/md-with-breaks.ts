export const mdWithBreaks = (input: string): string => {
  let md: string = input.replace(/```[\s\S]*?```/g, (m) =>
    m.replace(/\n/g, "\n ")
  );
  md = md.replace(/\\/g, "<br>\n");
  md = md.replace(/(?<=\n\n)(?![*-])\n/g, "&nbsp;\n ");

  // Support single linebreak
  md = md.replace(/(\n)/gm, "  \n");
  return md;
};
