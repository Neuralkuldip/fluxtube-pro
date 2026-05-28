import { Clock3, Download, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DownloadHistory() {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    fetch("https://fluxtube-api.onrender.com/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const clearAllHistory = async () => {
    try {
      await fetch("https://fluxtube-api.onrender.com/clear_history", { method: "POST" });
      setHistory([]);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadAgain = (item) => {
    const finalUrl = `https://fluxtube-api.onrender.com/download?url=${encodeURIComponent(item.url)}&quality=${item.quality}&type=${item.type}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="w-full max-w-[840px] rounded-[24px] border border-white/[0.04] bg-[#06050a]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Clock3 size={15} />
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Download History Logs
          </h2>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="h-[32px] px-3 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-1 text-[11px] font-bold"
          >
            <Trash2 size={12} />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 && (
        <div className="h-[160px] rounded-xl border border-dashed border-white/[0.04] bg-black/10 flex flex-col items-center justify-center gap-1.5 text-slate-600 text-xs font-bold select-none">
          <span>⏳</span>
          <span>No historical record outputs encountered.</span>
        </div>
      )}

      <div className="flex flex-col gap-2.5 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="min-h-[64px] rounded-xl border border-white/[0.02] bg-black/20 hover:bg-white/[0.01] transition-all flex flex-col sm:flex-row sm:items-center justify-between px-4 gap-2"
          >
            <div className="flex-1 overflow-hidden">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-300 truncate pr-3">
                {item.file || "Archived Stream Element"}
              </h3>
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-bold flex items-center gap-2 select-none">
                <span className="px-1.5 bg-white/[0.03] rounded border border-white/[0.04] text-[9px] uppercase tracking-wide text-slate-400">{item.type}</span>
                <span>•</span>
                <span className="text-fuchsia-400/70">{item.quality}</span>
              </div>
            </div>

            <button
              onClick={() => downloadAgain(item)}
              className="h-[34px] px-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 hover:border-transparent transition-all flex items-center justify-center gap-1 text-[11px] font-bold self-end sm:self-auto"
            >
              <Download size={12} />
              Re-download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}