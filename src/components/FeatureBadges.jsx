export default function FeatureBadges() {

  const items = [

    {

      color: "bg-cyan-400",

      text:
      "Unlimited Downloads",
    },

    {

      color: "bg-pink-400",

      text:
      "No Watermark",
    },

    {

      color: "bg-emerald-400",

      text:
      "Ultra Fast",
    },
  ];

  return (

    <div className="
      mt-8
      flex
      items-center
      gap-10
      text-[14px]
      text-slate-300
    ">

      {items.map((item, i) => (

        <div

          key={i}

          className="
            flex
            items-center
            gap-3
          "
        >

          <div className={`
            w-3
            h-3
            rounded-full
            ${item.color}
          `}></div>

          {item.text}

        </div>
      ))}

    </div>
  );
}