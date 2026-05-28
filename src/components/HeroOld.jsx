import {

  useState,

  useEffect,

} from "react";

import DownloadBox from "./DownloadBox";

import FeatureBadges from "./FeatureBadges";

import PlaylistPanel from "./PlaylistPanel";

import useClipboard from "../hooks/useClipboard";

import useDragDrop from "../hooks/useDragDrop";

export default function Hero() {

  const [url, setUrl] =
    useState("");

  const [qualities, setQualities] =
    useState([]);

  const [quality, setQuality] =
    useState("");

  const [type, setType] =
    useState("MP4");

  const [loading, setLoading] =
    useState(false);

  const [playlistVideos,
    setPlaylistVideos
  ] = useState([]);

  // CLIPBOARD

  const pasteClipboard = () => {

    useClipboard(setUrl);
  };

  // DRAG DROP

  const {

    handleDrop,

    handleDragOver,

  } = useDragDrop(
    setUrl
  );

  // PLAYLIST DETECT

  useEffect(() => {

    if (

      !url.includes(
        "playlist"
      )

      &&

      !url.includes(
        "list="
      )
    ) {

      setPlaylistVideos([]);

      return;
    }

    const timeout = setTimeout(

      async () => {

        try {

          const res = await fetch(

            "https://fluxtube-api.onrender.com/playlist",

            {

              method: "POST",

              headers: {

                "Content-Type":
                "application/json",
              },

              body: JSON.stringify({

                url,
              }),
            }
          );

          const data =
            await res.json();

          if (

            data.success
          ) {

            setPlaylistVideos(
              data.videos
            );
          }

        }

        catch (err) {

          console.log(err);
        }

      },

      1200
    );

    return () =>
      clearTimeout(timeout);

  }, [url]);

  // VIDEO INFO

  useEffect(() => {

    if (

      !url.includes(
        "youtube"
      )
    ) {

      setQualities([]);

      return;
    }

    if (

      url.includes(
        "playlist"
      )
    ) {

      return;
    }

    const timeout = setTimeout(

      async () => {

        try {

          const res = await fetch(

            "https://fluxtube-api.onrender.com/video_info",

            {

              method: "POST",

              headers: {

                "Content-Type":
                "application/json",
              },

              body: JSON.stringify({

                url,
              }),
            }
          );

          const data =
            await res.json();

          if (

            data.success
          ) {

            setQualities(
              data.formats
            );

            if (

              data.formats.length > 0
            ) {

              setQuality(

                data.formats[
                  data.formats.length - 1
                ]
              );
            }
          }

        }

        catch (err) {

          console.log(err);
        }

      },

      1000
    );

    return () =>
      clearTimeout(timeout);

  }, [url]);

  // SINGLE DOWNLOAD

  const startDownload = (

    customUrl = url
  ) => {

    if (!customUrl) return;

    setLoading(true);

    const finalUrl =

      `https://fluxtube-api.onrender.com/download?url=${encodeURIComponent(customUrl)}&quality=${quality}&type=${type}`;

    window.open(

      finalUrl,

      "_blank"
    );

    setTimeout(() => {

      setLoading(false);

    }, 2000);
  };

  // DOWNLOAD ALL

  const downloadAll = () => {

    playlistVideos.forEach(

      (video, index) => {

        setTimeout(() => {

          startDownload(
            video.url
          );

        }, index * 1800);
      }
    );
  };

  return (

    <section

      onDrop={handleDrop}

      onDragOver={handleDragOver}

      className="
        relative
        z-20
        min-h-screen
        flex
        flex-col
        items-center
        justify-start
        px-6
        pt-20
        text-center
      "
    >

      {/* TITLE */}

      <h1 className="
        text-[68px]
        leading-[76px]
        font-bold
        tracking-[-5px]
        max-w-[1000px]
        bg-gradient-to-r
        from-violet-500
        via-cyan-400
        via-emerald-400
        via-yellow-400
        to-orange-500
        bg-clip-text
        text-transparent
      ">

        Download Youtube
        <br />
        Video by Link!

      </h1>

      {/* BADGES */}

      <FeatureBadges />

      {/* SELECTORS */}

      <div className="
        mt-8
        flex
        gap-4
      ">

        {/* QUALITY */}

        {type === "MP4"

          &&

          playlistVideos.length === 0 && (

          <select

            value={quality}

            onChange={(e) =>

              setQuality(
                e.target.value
              )
            }

            className="
              h-[56px]
              px-6
              rounded-[18px]
              bg-[#1A1B23]
              border
              border-white/10
              text-white
              outline-none
              text-[15px]
              min-w-[140px]
            "
          >

            {qualities.length === 0 && (

              <option>
                Loading...
              </option>
            )}

            {qualities.map((q, i) => (

              <option
                key={i}
              >

                {q}

              </option>
            ))}

          </select>
        )}

        {/* TYPE */}

        <select

          value={type}

          onChange={(e) =>

            setType(
              e.target.value
            )
          }

          className="
            h-[56px]
            px-6
            rounded-[18px]
            bg-[#1A1B23]
            border
            border-white/10
            text-white
            outline-none
            text-[15px]
          "
        >

          <option>
            MP4
          </option>

          <option>
            MP3
          </option>

        </select>

      </div>

      {/* DOWNLOAD BOX */}

      <DownloadBox

        url={url}

        setUrl={setUrl}

        startDownload={
          startDownload
        }

        pasteClipboard={
          pasteClipboard
        }

        loading={loading}
      />

      {/* PLAYLIST PANEL */}

      <PlaylistPanel

        videos={playlistVideos}

        downloadVideo={
          startDownload
        }

        downloadAll={
          downloadAll
        }
      />

    </section>
  );
}