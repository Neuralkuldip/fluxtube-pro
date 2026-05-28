import { Plus, Trash2, Link2 } from "lucide-react";
import { useState } from "react";

export default function MultiUrlPage() {
  const [links, setLinks] = useState([""]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-8">Multi URL Downloader</h2>
      
      <div className="w-full space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1 flex items-center bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 hover:border-indigo-500/50 transition-all">
              <Link2 size={18} className="text-slate-500 mr-3" />
              <input 
                placeholder={`Paste YouTube URL link line #${index + 1}`}
                className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-600"
              />
            </div>
            {links.length > 1 && (
              <button 
                onClick={() => setLinks(links.filter((_, i) => i !== index))}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={() => setLinks([...links, ""])}
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
      >
        <Plus size={16} /> Add Field
      </button>

      <button className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:opacity-90 transition-all">
        Download All Package Links
      </button>

      <p className="mt-8 text-center text-[10px] text-slate-600 max-w-md">
        FluxTube is intended for personal and educational use only. Users are responsible for ensuring they have the legal rights or permission to download and use any content. Please respect YouTube's Terms of Service and the intellectual property rights of content creators.
      </p>
    </div>
  );
}