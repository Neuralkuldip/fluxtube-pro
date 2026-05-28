import DownloadBox from "./DownloadBox";
import FeatureCards from "./FeatureCards";

export default function PremiumHero({ url, setUrl, startDownload }) {
  return (
    <section 
      style={{ 
        width: '100%', 
        minHeight: '100vh', // Poori screen ki height cover karega
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', // Content ko vertically center karega
        paddingTop: '120px', // Absolute navbar ke liye upar jagah chhodega
        paddingBottom: '80px' 
      }}
    >
      
      {/* EXACT DESIGN HEADING */}
      <h1 
        className="font-black tracking-tight select-none font-sans"
        style={{
          fontSize: 'clamp(42px, 5.5vw, 76px)',
          lineHeight: '1.1',
          backgroundImage: 'linear-gradient(to right, #4f46e5, #c084fc, #e11d48, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '32px',
          textAlign: 'center'
        }}
      >
        Download Youtube <br /> Video by Link!
      </h1>

      {/* HORIZONTAL BADGES */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-sm text-slate-300 font-semibold">
          <span style={{ textShadow: '0 0 12px #818cf8' }}>🚀</span> Unlimited Downloads
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-sm text-slate-300 font-semibold">
          <span style={{ textShadow: '0 0 12px #e879f9' }}>🛡️</span> No Watermark
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-sm text-slate-300 font-semibold">
          <span style={{ textShadow: '0 0 12px #34d399' }}>⚡</span> Ultra Fast
        </div>
      </div>

      {/* DOWNLOAD BOX CONTAINER (Strict Max Width 900px) */}
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '60px' }}>
        <DownloadBox url={url} setUrl={setUrl} startDownload={startDownload} />
      </div>

      {/* FEATURE CARDS CONTAINER (Strict Max Width 1000px) */}
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <FeatureCards />
      </div>

    </section>
  );
}