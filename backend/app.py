from flask import (

    Flask,

    request,

    jsonify,

    send_file
)

from flask_cors import CORS

import os

import threading

import time

from video_info import (
    get_video_info
)

from download_manager import (
    download_video
)

from status_manager import (
    download_status
)

from history_manager import (

    get_history,

    clear_history
)

from queue_manager import (
    add_to_queue,
    get_queue
)

from playlist_manager import (
    get_playlist_videos
)

app = Flask(__name__)

CORS(app)

DOWNLOAD_FOLDER = "downloads"

if not os.path.exists(
    DOWNLOAD_FOLDER
):

    os.makedirs(
        DOWNLOAD_FOLDER
    )


# VIDEO INFO

@app.route(
    "/video_info",
    methods=["POST"]
)

def video_info():

    data = request.json

    url = data.get("url")

    result = get_video_info(
        url
    )

    return jsonify(result)


# AUTO DELETE

def delayed_delete(file_path):

    time.sleep(60)

    try:

        if os.path.exists(file_path):

            os.remove(file_path)

            print(
                "Deleted:",
                file_path
            )

    except Exception as e:

        print(
            "Delete Error:",
            e
        )


# DOWNLOAD

@app.route("/download")

def download():

    url = request.args.get(
        "url"
    )

    quality = request.args.get(
        "quality"
    )

    media_type = request.args.get(
        "type"
    )

    add_to_queue({

        "url": url,

        "quality": quality,

        "type": media_type,
    })

    result = download_video(

        url,

        quality,

        media_type
    )

    if not result["success"]:

        return jsonify(result)

    filename = result["file"]

    path = os.path.join(

        DOWNLOAD_FOLDER,

        filename
    )

    threading.Thread(

        target=delayed_delete,

        args=(path,)
    ).start()

    return send_file(

        path,

        as_attachment=True
    )


# STATUS

@app.route("/status")

def status():

    return jsonify(
        download_status
    )


# HISTORY

@app.route("/history")

def history():

    return jsonify(
        get_history()
    )


# CLEAR HISTORY

@app.route(
    "/clear_history",
    methods=["POST"]
)

def clear_history_route():

    clear_history()

    return jsonify({

        "success": True
    })


# QUEUE

@app.route("/queue")

def queue():

    return jsonify(
        get_queue()
    )


# PLAYLIST

@app.route(
    "/playlist",
    methods=["POST"]
)

def playlist():

    data = request.json

    url = data.get("url")

    result = get_playlist_videos(
        url
    )

    return jsonify(result)


if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True
    )