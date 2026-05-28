export default function Navbar() {

  return (

    <header className="
      relative
      z-20
      w-full
      px-10
      py-7
      flex
      items-center
      justify-between
    ">

      {/* LOGO */}

      <h1 className="
        text-[34px]
        font-semibold
        tracking-[-2px]
      ">

        <span className="text-violet-500">
          F
        </span>

        <span className="text-cyan-400">
          l
        </span>

        <span className="text-emerald-400">
          u
        </span>

        <span className="text-yellow-400">
          x
        </span>

        <span className="text-orange-400">
          T
        </span>

        <span className="text-pink-500">
          u
        </span>

        <span className="text-cyan-400">
          b
        </span>

        <span className="text-yellow-400">
          e
        </span>

      </h1>

      {/* MENU */}

      <nav className="
        flex
        items-center
        gap-10
        text-[15px]
        text-slate-400
      ">

        <a href="#">
          Home
        </a>

        <a href="#">
          Features
        </a>

        <a href="#">
          Download
        </a>

        <a href="#">
          Install
        </a>

      </nav>

    </header>
  );
}