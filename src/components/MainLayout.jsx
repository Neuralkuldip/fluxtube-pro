import { useState } from "react"; // YE LINE SABSE IMPORTANT HAI
import PremiumNavbar from "./PremiumNavbar";
import PremiumHero from "./PremiumHero";

export default function MainLayout() {
  const [active, setActive] = useState("downloader");
  const [url, setUrl] = useState("");

  const startDownload = (customUrl) => {
    const targetUrl = customUrl || url;
    if (!targetUrl) return;
    const finalUrl = `http://127.0.0.1:5000/download?url=${encodeURIComponent(targetUrl)}&quality=1080p&type=MP4`;
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="w-full min-h-screen bg-[#030207] text-white overflow-x-hidden relative font-sans antialiased flex flex-col justify-between">
      
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center relative z-30 pt-8 px-4">
          <PremiumNavbar active={active} setActive={setActive} />
        </div>

        <main className="relative z-20 w-full max-w-7xl flex flex-col items-center px-4 sm:px-8 mt-16 pb-20">
          {active === "downloader" && <PremiumHero url={url} setUrl={setUrl} startDownload={startDownload} />}
          {active === "multi" && <div className="text-white mt-20">Multi URL Content</div>}
          {active === "queue" && <div className="text-white mt-20">Queue Content</div>}
          {active === "history" && <div className="text-white mt-20">History Content</div>}
        </main>
      </div>

      <footer className="w-full py-10 text-center relative z-20 mt-auto select-none">
        <p className="text-slate-600 text-xs font-semibold tracking-wider">© 2024 FluxTube. All rights reserved.</p>
      </footer>
    </div>
  );
}