# NewsSynth

AI-powered news analysis web application built with FastAPI and a lightweight frontend for summarization, explanation, fact-checking, article extraction, OCR, and contextual term support.

## Overview

NewsSynth is a full-stack web application designed to help users understand news articles faster and more clearly. It combines article extraction, OCR, and LLM-powered analysis to turn raw article content into concise summaries, plain-language explanations, fact-checking support, and quick background context for difficult political, legal, or historical terms.

The project includes a FastAPI backend and a responsive frontend built with HTML, CSS, and JavaScript. Users can provide input as plain text, article URLs, or uploaded images, and the system processes that input through dedicated API endpoints.

## Features

- **Article summarization** using an LLM prompt that returns concise bullet-point summaries.
- **Plain-language explanation** to make dense or technical articles easier to understand.
- **Fact-check assistance** that extracts factual claims and labels them as likely true, false, or unverifiable.
- **URL-based article extraction** using `newspaper3k`, `requests`, and `BeautifulSoup`.
- **Image-to-text OCR** using `pytesseract` and `Pillow`.
- **Context lookup** for political, legal, and historical terms.
- **Automatic term extraction** to identify terms that may require background explanation.
- **Responsive UI** with card-based actions and dark mode support.

## Tech Stack

### Backend
- FastAPI
- Uvicorn
- Groq API
- Newspaper3k
- BeautifulSoup4
- Requests
- Pillow
- pytesseract
- python-multipart
- lxml

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```bash
news-fastapi/
├── Backend/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── script.js
    ├── style.css
    └── images/
        └── logo.jpg
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/summarize` | Summarize article text into 5 bullet points |
| POST | `/explain` | Explain article content in simpler language |
| POST | `/factcheck` | Extract and assess factual claims |
| POST | `/extract` | Extract clean article text from a URL |
| POST | `/image-to-text` | Extract text from an uploaded image |
| POST | `/context` | Explain a given term in 1–3 lines |
| POST | `/context-terms` | Extract contextual terms from generated output |

## Request Examples

### Summarize text

```json
{
  "content": "Your article text here"
}
```

### Extract article from URL

```json
{
  "content": "https://example.com/news-article"
}
```

### Get context for a term

```json
{
  "term": "Cold War"
}
```

## Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- Python 3.9 or later
- pip
- Tesseract OCR
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/DakshDashora/news-fastapi.git
cd news-fastapi
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
```

**Windows**
```bash
venv\Scripts\activate
```

**macOS / Linux**
```bash
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r Backend/requirements.txt
```

### 4. Configure environment variables

Set your Groq API key before starting the backend.

**Windows PowerShell**
```powershell
$env:GROQ_API_KEY="your_api_key_here"
```

**macOS / Linux**
```bash
export GROQ_API_KEY="your_api_key_here"
```

## Running the Application

### Run the backend

From the project root:

```bash
uvicorn Backend.main:app --reload
```

Or from inside the `Backend` directory:

```bash
uvicorn main:app --reload
```

Backend will be available at:

- `http://127.0.0.1:8000`
- Swagger Docs: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

### Run the frontend

You can open `frontend/index.html` directly in a browser, but using a local server is recommended.

```bash
cd frontend
python -m http.server 5500
```

Then open:

```bash
http://127.0.0.1:5500
```

## Frontend Configuration

The frontend JavaScript currently points to a deployed backend URL. If you want to run the project locally, update the `backendUrl` value in `frontend/script.js` to match your local FastAPI server.

Example:

```js
const backendUrl = "http://127.0.0.1:8000";
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | API key used to access Groq models |

## Dependencies

```txt
fastapi
uvicorn[standard]
pillow
pytesseract
newspaper3k
lxml[html_clean]
groq
python-multipart
beautifulsoup4
```

## Implementation Notes

- CORS is currently configured for a specific deployed frontend origin.
- OCR functionality depends on system-level Tesseract installation.
- Article extraction performs basic cleanup of cookie banners, ad overlays, and modal-like elements before parsing.
- Context terms are generated from model output and intended to improve user understanding of complex references.

## Suggested Improvements

- Add persistent article history or saved outputs.
- Add source-backed fact verification instead of model-only assessment.
- Improve highlighted-term interaction in the frontend.
- Add tests for API endpoints and parsing logic.
- Add Docker support and deployment instructions.
- Add CI/CD workflows for automated validation.



## Contributing

Contributions, improvements, and feedback are welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your work
5. Push the branch
6. Open a pull request

## Author

**Daksh Dashora**  
GitHub: [DakshDashora](https://github.com/DakshDashora)


