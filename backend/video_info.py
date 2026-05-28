import yt_dlp


def get_video_info(url):

    ydl_opts = {

        "quiet": True,

        "noplaylist": True,
    }

    try:

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            info = ydl.extract_info(

                url,

                download=False
            )

            formats = []

            for f in info.get(
                "formats",
                []
            ):

                height = f.get(
                    "height"
                )

                ext = f.get(
                    "ext"
                )

                if (

                    height

                    and

                    ext == "mp4"
                ):

                    label = f"{height}p"

                    if label not in formats:

                        formats.append(
                            label
                        )

            formats = sorted(

                formats,

                key=lambda x:
                int(
                    x.replace(
                        "p",
                        ""
                    )
                )
            )

            return {

                "success": True,

                "title":
                info.get(
                    "title"
                ),

                "thumbnail":
                info.get(
                    "thumbnail"
                ),

                "channel":
                info.get(
                    "uploader"
                ),

                "duration":
                info.get(
                    "duration"
                ),

                "formats":
                formats,
            }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }