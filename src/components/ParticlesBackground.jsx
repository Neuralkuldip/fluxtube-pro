export default function ParticlesBackground() {

  return (

    <div className="
      absolute
      inset-0
      overflow-hidden
      pointer-events-none
    ">

      {[...Array(25)].map((_, i) => (

        <div

          key={i}

          className="
            absolute
            rounded-full
            bg-white/10
            animate-pulse
          "

          style={{

            width:
              Math.random() * 8 + 4,

            height:
              Math.random() * 8 + 4,

            top:
              `${Math.random() * 100}%`,

            left:
              `${Math.random() * 100}%`,

            animationDuration:
              `${Math.random() * 5 + 2}s`,
          }}
        />
      ))}

    </div>
  );
}