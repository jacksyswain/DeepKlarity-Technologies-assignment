import requests
from bs4 import BeautifulSoup


def scrape_recipe(url: str):

    headers = {
        "User-Agent": (
            "Mozilla/5.0 "
            "(Windows NT 10.0; Win64; x64)"
        )
    }

    response = requests.get(
        url,
        headers=headers,
        timeout=15
    )

    response.raise_for_status()

    raw_html = response.text

    soup = BeautifulSoup(raw_html, "lxml")

    # remove unwanted tags
    for tag in soup(
        ["script", "style", "noscript"]
    ):
        tag.extract()

    title = soup.title.string if soup.title else ""

    text = soup.get_text(
        separator=" ",
        strip=True
    )

    cleaned_text = " ".join(
        text.split()
    )

    final_content = f"""
    PAGE TITLE:
    {title}

    PAGE CONTENT:
    {cleaned_text}
    """

    return {
        "content": final_content[:20000],
        "raw_html": raw_html
    }