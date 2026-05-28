export default function Footer() {

  return (

    <footer className="
      mt-24
      pb-10
      px-6
      text-center
      relative
      z-20
    ">

      {/* DISCLAIMER */}

      <div className="
        max-w-[900px]
        mx-auto
        rounded-[26px]
        border
        border-white/10
        bg-[#14141B]/60
        backdrop-blur-[30px]
        px-8
        py-6
      ">

        <p className="
          text-slate-400
          text-[14px]
          leading-[28px]
        ">

          FluxTube is intended for personal and educational use only.
          Users are responsible for ensuring they have the legal rights
          or permission to download and use any content.
          Please respect YouTube's Terms of Service and the intellectual
          property rights of content creators.

        </p>

      </div>

      {/* COPYRIGHT */}

      <p className="
        mt-6
        text-slate-500
        text-[13px]
      ">

        © 2026 FluxTube.
        All rights reserved.

      </p>

    </footer>
  );
}