import {

  Download,

  Clock3,

  Layers3,

} from "lucide-react";

export default function Sidebar({

  active,

  setActive,
}) {

  const items = [

    {

      id: "downloader",

      icon: Download,

      label: "Downloader",
    },

    {

      id: "queue",

      icon: Layers3,

      label: "Queue",
    },

    {

      id: "history",

      icon: Clock3,

      label: "History",
    },
  ];

  return (

    <div className="
      w-[280px]
      min-h-screen
      border-r
      border-white/10
      bg-[#121216]/80
      backdrop-blur-[30px]
      p-6
      flex
      flex-col
    ">

      {/* LOGO */}

      <div className="
        mb-12
      ">

        <h1 className="
          text-[32px]
          font-bold
          tracking-[-2px]
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-400
          to-orange-400
          bg-clip-text
          text-transparent
        ">

          FluxTube

        </h1>

      </div>

      {/* NAV */}

      <div className="
        flex
        flex-col
        gap-3
      ">

        {items.map((item) => {

          const Icon =
            item.icon;

          return (

            <button

              key={item.id}

              onClick={() =>

                setActive(
                  item.id
                )
              }

              className={`
                h-[64px]
                rounded-[22px]
                px-5
                flex
                items-center
                gap-4
                transition-all
                duration-300

                ${active === item.id

                  ? `
                    bg-gradient-to-r
                    from-violet-600
                    to-fuchsia-500
                    text-white
                    shadow-[0_0_40px_rgba(168,85,247,0.25)]
                  `

                  : `
                    bg-white/[0.03]
                    text-slate-400
                    hover:bg-white/[0.06]
                    hover:text-white
                  `
                }
              `}
            >

              <Icon size={22} />

              <span className="
                text-[16px]
                font-medium
              ">

                {item.label}

              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}