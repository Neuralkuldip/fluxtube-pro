import {

  ListVideo,

  Download,

} from "lucide-react";

export default function PlaylistPanel({

  videos,

  downloadVideo,

  downloadAll,
}) {

  if (

    !videos ||

    videos.length === 0
  ) {

    return null;
  }

  return (

    <div className="
      mt-10
      w-full
      max-w-[1100px]
      rounded-[34px]
      border
      border-white/10
      bg-[#1A1B23]/60
      backdrop-blur-[30px]
      p-8
    ">

      {/* HEADER */}

      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <ListVideo size={24} />

          <h2 className="
            text-[24px]
            font-semibold
          ">

            Playlist Videos

          </h2>

        </div>

        {/* DOWNLOAD ALL */}

        <button

          onClick={downloadAll}

          className="
            h-[52px]
            px-6
            rounded-[18px]
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500
            text-white
            font-medium
            flex
            items-center
            gap-2
            shadow-[0_0_40px_rgba(168,85,247,0.25)]
            hover:scale-[1.02]
            transition-all
          "
        >

          <Download size={18} />

          Download All

        </button>

      </div>

      {/* VIDEOS */}

      <div className="
        flex
        flex-col
        gap-4
        max-h-[520px]
        overflow-y-auto
        pr-2
      ">

        {videos.map((video, i) => (

          <div

            key={i}

            className="
              min-h-[84px]
              rounded-[24px]
              border
              border-white/5
              bg-black/20
              flex
              items-center
              justify-between
              px-6
            "
          >

            {/* INFO */}

            <div className="
              flex-1
              overflow-hidden
              pr-5
            ">

              <h3 className="
                text-[15px]
                font-medium
                truncate
              ">

                {video.title}

              </h3>

              <p className="
                text-slate-500
                text-[13px]
                mt-2
              ">

                Playlist Video

              </p>

            </div>

            {/* BUTTON */}

            <button

              onClick={() =>

                downloadVideo(
                  video.url
                )
              }

              className="
                h-[46px]
                px-5
                rounded-[16px]
                bg-white/5
                hover:bg-white/10
                transition-all
                flex
                items-center
                gap-2
                shrink-0
              "
            >

              <Download size={16} />

              Download

            </button>

          </div>
        ))}

      </div>

    </div>
  );
}