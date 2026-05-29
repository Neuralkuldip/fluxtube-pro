import { useEffect, useState } from "react";
import { ListOrdered, Loader2 } from "lucide-react";

export default function QueuePanel() {
  const [queue, setQueue] = useState({ active: null, queue: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fluxtube-pro-production.up.railway.app/queue")
      .then((res) => res.json())
      .then((data) => {
        setQueue(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="w-full max-w-[840px] rounded-[24px] border border-white/[0.04] bg-[#06050a]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <ListOrdered size={15} />
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Active Pipe Queue
          </h2>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.05] text-slate-500 text-[11px] font-bold">
          {queue.queue.length} Pending
        </div>
      </div>

      {loading ? (
        <div className="h-[160px] flex flex-col items-center justify-center gap-2 text-slate-600 text-xs font-bold">
          <Loader2 size={20} className="animate-spin text-fuchsia-500" />
          <span>Syncing pipeline array streams...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {queue.active && (
            <div className="p-4 rounded-xl border border-fuchsia-500/15 bg-fuchsia-500/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping shrink-0" />
                <p className="text-xs sm:text-sm font-semibold text-slate-300 truncate">{queue.active.title || "Processing conversion data pipeline..."}</p>
              </div>
              <span className="text-xs text-fuchsia-400 font-bold select-none">{queue.active.progress || "0"}%</span>
            </div>
          )}

          {queue.queue.length === 0 && !queue.active && (
            <div className="h-[160px] rounded-xl border border-dashed border-white/[0.04] bg-black/10 flex flex-col items-center justify-center gap-1.5 text-slate-600 text-xs font-bold select-none">
              <span>📥</span>
              <span>No current streaming requests pending.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}