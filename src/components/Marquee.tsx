const tags = [
  "TypeScript",
  "React",
  "Python",
  "Three.js",
  "LangChain",
  "Next.js",
  "PostgreSQL",
  "D3.js",
  "OpenCV",
  "TensorFlow",
  "Docker",
  "AWS",
];

export function Marquee() {
  const duplicatedTags = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className="w-full overflow-hidden border-y border-[#222] bg-[#0a0a0a] py-3 relative z-10">
      <div className="flex w-[200%] animate-[marquee_30s_linear_infinite]">
        {duplicatedTags.map((tag, i) => (
          <div
            key={i}
            className="flex-1 text-center font-mono text-[12px] uppercase tracking-widest text-[#888]/40 whitespace-nowrap px-8"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
