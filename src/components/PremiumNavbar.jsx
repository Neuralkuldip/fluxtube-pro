import { Home, Link2, List, History, Play } from "lucide-react";

export default function PremiumNavbar({ active, setActive }) {
  const navItems = [
    { id: "downloader", label: "Downloader", icon: Home },
    { id: "multi", label: "Multi URL", icon: Link2 },
    { id: "queue", label: "Queue", icon: List },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <nav 
      style={{ 
        position: 'absolute', // Parent container ki centering ko todne ke liye
        top: 0, 
        left: 0, 
        width: '100%', 
        padding: '28px 5vw', // Left aur Right edges se space banaye rakhne ke liye
        display: 'flex', 
        justifyContent: 'space-between', // Logo extreme left, links extreme right
        alignItems: 'center', 
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        zIndex: 50 // Taaki ye baaki cheezon ke upar rahe
      }}
    >
      
      {/* 1. LOGO SECTION (Extreme Left) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'linear-gradient(135deg, #6366f1, #ec4899)', 
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
        }}>
          <Play fill="white" strokeWidth={0} size={20} style={{ marginLeft: '4px' }} />
        </div>
        <span style={{ fontSize: '26px', fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
          FluxTube
        </span>
      </div>

      {/* 2. NAV LINKS SECTION (Extreme Right) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', borderRadius: '100px',
                fontSize: '14px', fontWeight: '600',
                transition: 'all 0.2s ease', cursor: 'pointer',
                // Active button (Downloader) purle glow ke sath
                backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(139, 92, 246, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isActive ? 'white' : '#94a3b8',
                boxShadow: isActive ? '0 0 20px rgba(139, 92, 246, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon size={16} color={isActive ? '#c084fc' : '#64748b'} />
              {item.label}
            </button>
          );
        })}
      </div>

    </nav>
  );
}