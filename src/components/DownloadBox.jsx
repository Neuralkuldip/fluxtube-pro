import { useState } from "react";
import { Link2, Download } from "lucide-react";

export default function DownloadBox({ url, setUrl, startDownload }) {
  const [quality, setQuality] = useState("1080p");
  const [format, setFormat] = useState("MP4");

  const triggerClipboardPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.warn("Clipboard access blocked.");
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 1. TOP ROW: DROPDOWNS */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '180px' }}>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            style={{ width: '100%', appearance: 'none', backgroundColor: '#090810', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 20px', color: '#e2e8f0', fontSize: '14px', fontWeight: 'bold', outline: 'none', cursor: 'pointer' }}
          >
            <option value="1080p">1080p (Full HD)</option>
            <option value="720p">720p (HD)</option>
            <option value="4k">4K (Ultra HD)</option>
          </select>
          <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b', fontSize: '10px' }}>▼</div>
        </div>

        <div style={{ position: 'relative', width: '120px' }}>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            style={{ width: '100%', appearance: 'none', backgroundColor: '#090810', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 20px', color: '#e2e8f0', fontSize: '14px', fontWeight: 'bold', outline: 'none', cursor: 'pointer' }}
          >
            <option value="MP4">MP4</option>
            <option value="MKV">MKV</option>
            <option value="MP3">MP3</option>
          </select>
          <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b', fontSize: '10px' }}>▼</div>
        </div>
      </div>

      {/* 2. MIDDLE ROW: MAIN INPUT BOX (Fixed Width & Glow) */}
      <div 
        style={{
          width: '100%',
          position: 'relative',
          borderRadius: '24px',
          padding: '2px',
          marginBottom: '24px',
          background: 'linear-gradient(to right, rgba(99, 102, 241, 0.6), rgba(236, 72, 153, 0.4), rgba(245, 158, 11, 0.6))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-transparent to-orange-400/20 rounded-[24px] blur-xl opacity-60 pointer-events-none" />
        
        <div style={{ position: 'relative', backgroundColor: '#07060c', borderRadius: '22px', height: '76px', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '12px', width: '100%' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', flexShrink: 0 }}>
            <Link2 size={20} />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube link here..."
            style={{ flex: 1, backgroundColor: 'transparent', outline: 'none', color: 'white', fontSize: '16px', padding: '0 8px', width: '100%' }}
          />

          <button
            onClick={() => startDownload(url, quality, format)}
            style={{
              height: '52px',
              padding: '0 32px',
              borderRadius: '16px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(to right, #6366f1, #ec4899, #f59e0b)',
              boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
              cursor: 'pointer',
              border: 'none',
              flexShrink: 0
            }}
          >
            <span>Download</span>
            <Download size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 3. BOTTOM ROW: SUB ACTIONS */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>
        <button onClick={triggerClipboardPaste} className="hover:text-slate-300 transition-colors" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          📋 Paste
        </button>
        <button onClick={triggerClipboardPaste} className="hover:text-slate-300 transition-colors" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)', cursor: 'pointer' }}>
          From Clipboard
        </button>
        <span style={{ padding: '8px 16px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px', pointerEvents: 'none' }}>
          or drag & drop link here
        </span>
      </div>
    </div>
  );
}