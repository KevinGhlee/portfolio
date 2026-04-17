export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0a1628] opacity-15 blur-[120px] animate-[mesh-1_40s_ease-in-out_infinite]" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0a2825] opacity-15 blur-[120px] animate-[mesh-2_45s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-[#1a0a28] opacity-15 blur-[120px] animate-[mesh-3_50s_ease-in-out_infinite]" />
    </div>
  );
}
