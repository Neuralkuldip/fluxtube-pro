import yt_dlp


def get_playlist_videos(url):

    try:

        ydl_opts = {

            "quiet": True,

            "extract_flat": True,
        }

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            info = ydl.extract_info(

                url,

                download=False
            )

            videos = []

            for entry in info.get(
                "entries",
                []
            ):

                videos.append({

                    "title":
                    entry.get(
                        "title"
                    ),

                    "url":
                    f"https://youtube.com/watch?v={entry.get('id')}"
                })

            return {

                "success": True,

                "videos": videos,
            }

    except Exception as e:

        return {

            "success": False,

            "error": str(e)
        }