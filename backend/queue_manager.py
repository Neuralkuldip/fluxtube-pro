download_queue = []

active_download = None


def add_to_queue(data):

    download_queue.append(data)


def get_queue():

    return {

        "active": active_download,

        "queue": download_queue,
    }


def pop_queue():

    global active_download

    if len(download_queue) > 0:

        active_download = (
            download_queue.pop(0)
        )

        return active_download

    active_download = None

    return None