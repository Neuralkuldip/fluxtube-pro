import { Shield, Zap, BadgeCheck } from "lucide-react";

export default function FeatureCards() {
  const customCards = [
    {
      icon: BadgeCheck,
      title: "High Quality",
      desc: "Download in 4K, 1080p, 720p and more.",
      glowStyle: {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        color: '#818cf8',
        boxShadow: '0 0 25px rgba(99, 102, 241, 0.15)'
      }
    },
    {
      icon: Zap,
      title: "Super Fast",
      desc: "Blazing fast servers for instant downloads.",
      glowStyle: {
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(217, 70, 239, 0.1))',
        borderColor: 'rgba(236, 72, 153, 0.3)',
        color: '#f472b6',
        boxShadow: '0 0 25px rgba(236, 72, 153, 0.15)'
      }
    },
    {
      icon: Shield,
      title: "100% Safe",
      desc: "No malware, no ads. Totally secure.",
      glowStyle: {
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        color: '#34d399',
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.15)'
      }
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%' }}>
      {customCards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              backgroundColor: 'rgba(9,8,18,0.9)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backdropFilter: 'blur(10px)'
            }}
            className="hover:bg-[#0c0a18] hover:border-white/[0.15] transition-all duration-300"
          >
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                border: `1px solid ${card.glowStyle.borderColor}`,
                background: card.glowStyle.background,
                color: card.glowStyle.color,
                boxShadow: card.glowStyle.boxShadow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Icon size={26} strokeWidth={2} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                {card.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
                {card.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}