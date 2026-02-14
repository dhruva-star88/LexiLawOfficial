import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL_NAME = "openai/gpt-oss-120b"


def generate_answer(context_chunks, question):

    context_text = "\n\n".join(context_chunks) if context_chunks else ""

    prompt = f"""
You are a professional legal document assistant.

Behavior Rules:

1. If the user greets you (e.g., "hi", "hello"), respond politely and invite them to ask about the document.
2. If the user expresses gratitude (e.g., "thanks"), respond courteously.
3. If the question is unrelated to the uploaded document, respond politely and state that you can only answer questions about the uploaded document.
4. If the question is related to the document:
   - Answer ONLY using the provided context.
   - Do NOT add external knowledge.
   - If the answer is not present in the context, clearly say:
     "The provided document does not contain this information."
5. Keep responses professional and concise.

Document Context:
{context_text}

User Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful and precise legal AI assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return response.choices[0].message.content.strip()
