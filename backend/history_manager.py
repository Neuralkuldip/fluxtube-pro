import json

HISTORY_FILE = "history.json"


def save_history(data):

    try:

        with open(
            HISTORY_FILE,
            "r"
        ) as f:

            history = json.load(f)

    except:

        history = []

    history.insert(0, data)

    with open(
        HISTORY_FILE,
        "w"
    ) as f:

        json.dump(
            history,
            f,
            indent=4
        )


def get_history():

    try:

        with open(
            HISTORY_FILE,
            "r"
        ) as f:

            return json.load(f)

    except:

        return []


def clear_history():

    with open(
        HISTORY_FILE,
        "w"
    ) as f:

        json.dump([], f)