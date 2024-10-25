from typing import List, Tuple


def get_largest_choice(choices: List[Tuple[str, str]]):
    largest = choices[0][0]

    for item in choices:
        curr_item = item[0]
        if len(curr_item) > len(largest):
            largest = curr_item

    return largest
