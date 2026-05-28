export default function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* BACKGROUND MESH BLENDS */}
      <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] h-[750px] opacity-75 mix-blend-screen">
        {/* Left Side Deep Violet Vector Radial */}
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
        
        {/* Middle Fuchsia Transition Core */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-500/5 blur-[120px]" />
        
        {/* Right Side Tangerine Accent Radial */}
        <div className="absolute top-[15%] right-[-5%] w-[550px] h-[550px] rounded-full bg-orange-500/10 blur-[150px]" />
      </div>

      {/* ABSTRACT HUD ALIGNED DOT MATRIX */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* CORE FRAMEWORK GRADIENT VIGNETTE LAYER */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030207] via-transparent to-[#030207] opacity-95" />
    </div>
  );
}