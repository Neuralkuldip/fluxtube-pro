import yt_dlp
import os
import re

from status_manager import download_status
from history_manager import save_history

DOWNLOAD_FOLDER = "downloads"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

COOKIE_FILE = os.path.join(
    BASE_DIR,
    "cookies.txt"
)


def clean_filename(name):

    name = re.sub(
        r'[\\/*?:"<>|]',
        "",
        name
    )

    name = name.strip()

    return name[:80]


def progress_hook(d):

    if d["status"] == "downloading":

        total = d.get("total_bytes") or d.get(
            "total_bytes_estimate"
        )

        downloaded = d.get(
            "downloaded_bytes",
            0
        )

        percent = int(
            downloaded * 100 / total
        ) if total else 0

        speed = d.get("speed")
        eta = d.get("eta")

        download_status["progress"] = percent
        download_status["speed"] = (
            f"{round(speed / 1024 / 1024, 2)} MB/s"
            if speed else "0 MB/s"
        )

        download_status["eta"] = (
            f"{eta} sec"
            if eta else "0 sec"
        )

        download_status["downloaded"] = (
            f"{round(downloaded / 1024 / 1024, 2)} MB"
        )

        download_status["total"] = (
            f"{round(total / 1024 / 1024, 2)} MB"
            if total else "0 MB"
        )

        download_status["status"] = "downloading"

    elif d["status"] == "finished":

        download_status["status"] = "finished"
        download_status["progress"] = 100


def download_video(
    url,
    quality,
    media_type
):

    try:

        with yt_dlp.YoutubeDL({

            "quiet": True,

            "cookiefile": COOKIE_FILE,

            "no_warnings": True,

            "geo_bypass": True,

        }) as ydl:

            info = ydl.extract_info(
                url,
                download=False
            )

            title = clean_filename(
                info.get(
                    "title",
                    "video"
                )
            )

            video_id = info.get("id")

        safe_name = (
            f"{title}_[{video_id}]"
        )

        if media_type == "MP3":

            ydl_opts = {

                "format": "bestaudio",

                "outtmpl":
                f"{DOWNLOAD_FOLDER}/{safe_name}.%(ext)s",

                "cookiefile":
                COOKIE_FILE,

                "quiet":
                True,

                "no_warnings":
                True,

                "geo_bypass":
                True,

                "progress_hooks":
                [progress_hook],

                "postprocessors": [
                    {
                        "key":
                        "FFmpegExtractAudio",

                        "preferredcodec":
                        "mp3",

                        "preferredquality":
                        "320",
                    }
                ],
            }

        else:
            if quality == "720p":

                selected_format = (
                    "bestvideo[height<=720]+bestaudio/best[height<=720]"
            )
                
            elif quality == "1080p":

                selected_format = (
                    "bestvideo[height<=1080]+bestaudio/best[height<=1080]"
            )
            elif quality == "4k":

                selected_format = (
                    "bestvideo[height<=2160]+bestaudio/best"
            )
            else:

                selected_format = "best"

            ydl_opts = {
                 "format":
        selected_format,

        "outtmpl":
        f"{DOWNLOAD_FOLDER}/{safe_name}.%(ext)s",

        "cookiefile":
        COOKIE_FILE,

        "quiet":
        True,

        "no_warnings":
        True,

        "geo_bypass":
        True,

        "progress_hooks":
        [progress_hook],
            }

        with yt_dlp.YoutubeDL(
            ydl_opts
        ) as ydl:

            ydl.extract_info(
                url,
                download=True
            )

        filename = (
            f"{safe_name}.mp3"
            if media_type == "MP3"
            else f"{safe_name}.mp4"
        )

        save_history({

            "file": filename,

            "quality": quality,

            "type": media_type,

            "url": url
        })

        return {
            "success": True,
            "file": filename,
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }