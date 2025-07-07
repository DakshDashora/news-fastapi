from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from newspaper import Article
from PIL import Image
import pytesseract
import io
import os 

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client setup (read from env variable)
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def llama3_chat(prompt):
    response = groq_client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

class ArticleInput(BaseModel):
    content: str

@app.post("/summarize")
async def summarize_article(data: ArticleInput):
    prompt = f"Summarize the following article in 5 bullet points:\n\n{data.content}"
    try:
        result = llama3_chat(prompt)
        return {"summary": result}
    except Exception as e:
        return {"error": str(e)}

@app.post("/explain")
async def explain_terms(data: ArticleInput):
    prompt = f"Explain this clearly and simply:\n\n{data.content}"
    try:
        result = llama3_chat(prompt)
        return {"explanation": result}
    except Exception as e:
        return {"error": str(e)}

@app.post("/factcheck")
async def fact_check(data: ArticleInput):
    prompt = (
        "Analyze the following text. List each factual claim made and for each, state whether it is likely true, false, or unverifiable, "
        "based on general knowledge. Format as:\n- [claim]: [assessment]\n\n"
        + data.content
    )
    try:
        result = llama3_chat(prompt)
        return {"claims": result}
    except Exception as e:
        return {"error": str(e)}

@app.post("/extract")
async def extract_from_url(data: ArticleInput):
    try:
        article = Article(data.content)
        article.download()

        # PATCH: Set browser-like user-agent if content is empty
        if article.html is None or article.html.strip() == "":
            import requests
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                              "AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/114.0.0.0 Safari/537.36"
            }
            html = requests.get(data.content, headers=headers).text
            article.set_html(html)

        article.parse()
        return {"extracted": article.text}

    except Exception as e:
        return {"error": f"Failed to extract content: {str(e)}"}
    
@app.post("/image-to-text")
async def extract_text_from_image(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        extracted_text = pytesseract.image_to_string(image)
        return {"extracted": extracted_text.strip()}
    except Exception as e:
        return {"error": f"Failed to extract text from image: {str(e)}"}
