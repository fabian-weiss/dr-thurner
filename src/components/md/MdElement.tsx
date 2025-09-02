import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function MdElement(props: {
  markdown: string;
  className?: string;
  color?: string;
}) {
  const gfmOptions = {
    singleTilde: true,
    tableCellPadding: true,
    tablePipeAlign: true,
    firstLineBlank: true,
  };

  return (
    <div style={{ color: props.color }} className={props.className}>
      <Markdown
        remarkPlugins={[[remarkGfm, gfmOptions]]}
        rehypePlugins={[rehypeRaw]} // ✅ Enables raw HTML rendering
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {props.markdown}
      </Markdown>
    </div>
  );
}

export default MdElement;
