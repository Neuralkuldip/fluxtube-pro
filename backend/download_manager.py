import yt_dlp

import os

import re

from status_manager import (
    download_status
)

from history_manager import (
    save_history
)

DOWNLOAD_FOLDER = "downloads"

FFMPEG_PATH = r"C:\Users\kuldip\Downloads\ffmpeg-8.1.1-essentials_build\ffmpeg-8.1.1-essentials_build\bin"


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

        total = d.get(
            "total_bytes"
        ) or d.get(
            "total_bytes_estimate"
        )

        downloaded = d.get(
            "downloaded_bytes",
            0
        )

        if total:

            percent = int(

                downloaded
                * 100
                / total
            )

        else:

            percent = 0

        speed = d.get(
            "speed"
        )

        eta = d.get(
            "eta"
        )

        if speed:

            speed = (
                f"{round(speed / 1024 / 1024, 2)} MB/s"
            )

        else:

            speed = "0 MB/s"

        if eta:

            eta = f"{eta} sec"

        else:

            eta = "0 sec"

        download_status[
            "progress"
        ] = percent

        download_status[
            "speed"
        ] = speed

        download_status[
            "eta"
        ] = eta

        download_status[
            "downloaded"
        ] = (
            f"{round(downloaded / 1024 / 1024, 2)} MB"
        )

        download_status[
            "total"
        ] = (
            f"{round(total / 1024 / 1024, 2)} MB"
        )

        download_status[
            "status"
        ] = "downloading"

    elif d["status"] == "finished":

        download_status[
            "status"
        ] = "finished"

        download_status[
            "progress"
        ] = 100


def download_video(

    url,

    quality,

    media_type
):

    quality_map = {

        "360p":
        "bestvideo[height<=360]+bestaudio/best",

        "480p":
        "bestvideo[height<=480]+bestaudio/best",

        "720p":
        "bestvideo[height<=720]+bestaudio/best",

        "1080p":
        "bestvideo[height<=1080]+bestaudio/best",

        "1440p":
        "bestvideo[height<=1440]+bestaudio/best",

        "2160p":
        "bestvideo[height<=2160]+bestaudio/best",
    }

    try:

        # GET VIDEO INFO

        with yt_dlp.YoutubeDL({

            "quiet": True
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

            video_id = info.get(
                "id"
            )

        safe_name = (
            f"{title}_[{video_id}]"
        )

        # MP3

        if media_type == "MP3":

            ydl_opts = {

                "format":
                "bestaudio/best",

                "outtmpl":
                f"{DOWNLOAD_FOLDER}/{safe_name}.%(ext)s",

                "ffmpeg_location":
                FFMPEG_PATH,

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

        # MP4

        else:

            ydl_opts = {

                "format":
                quality_map.get(

                    quality,

                    "bestvideo+bestaudio/best"
                ),

                "merge_output_format":
                "mp4",

                "outtmpl":
                f"{DOWNLOAD_FOLDER}/{safe_name}.%(ext)s",

                "ffmpeg_location":
                FFMPEG_PATH,

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

        # FINAL FILE

        if media_type == "MP3":

            filename = (
                f"{safe_name}.mp3"
            )

        else:

            filename = (
                f"{safe_name}.mp4"
            )

        save_history({

            "file": filename,

            "quality": quality,

            "type": media_type,
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