from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()
api_key = os.getenv('GROQ_API_KEY')

# Initialize client lazily to avoid errors at import time
client = None

def get_client():
    """Lazy initialization of Groq client."""
    global client
    if client is None:
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key or api_key == 'your_groq_api_key_here':
            raise ValueError(
                "GROQ_API_KEY is not set. Please set your Groq API key in the .env file. "
                "Get your API key from https://console.groq.com/"
            )
        client = Groq(api_key=api_key)
    return client

def get_groq_response(prompt: str, context: str = ""):
    """
    Get legal response from Groq API with Indian Law specialization.
    
    Args:
        prompt (str): User's legal query
        context (str): Context from knowledge base (optional)
    
    Returns:
        str: AI-generated legal response
    """
    
    # Get the client (lazy initialization)
    client = get_client()
    
    # Build user message with context if provided
    user_message = prompt
    if context:
        user_message = (
            f"CONTEXT FROM KNOWLEDGE BASE:\n{context}\n\n"
            f"USER QUERY:\n{prompt}\n\n"
            "Provide your analysis following the response structure outlined in the system prompt."
        )
    
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert Legal AI Assistant specializing in Indian Law, with expertise in "
                    "legal compliance, risk assessment, and regulatory guidance under IPC, CrPC, and other "
                    "Indian statutes. Your role is to provide accurate, well-structured legal insights based "
                    "on the provided context.\n\n"
                    
                    "## Core Principles:\n"
                    "1. **Accuracy First**: Only provide information explicitly mentioned in the context. Never fabricate legal information.\n"
                    "2. **Context-Dependent**: Base all responses on the provided knowledge base context.\n"
                    "3. **Professional Tone**: Use formal legal language appropriate for legal matters.\n"
                    "4. **Practical Application**: Deliver actionable insights with real-world implications.\n\n"
                    
                    "## Response Structure:\n"
                    "### Offences Identified\n"
                    "- List all applicable sections with specific citations (e.g., 'Section 378 of IPC')\n"
                    "- Briefly describe each offence\n\n"
                    
                    "### Detailed Analysis\n"
                    "- Analyze the incident and explain why each section applies\n"
                    "- Provide legal reasoning connecting facts to law\n"
                    "- Highlight key elements that satisfy the offence criteria\n"
                    "- Include relevant precedents or interpretations if available in context\n\n"
                    
                    "### Punishment Provisions\n"
                    "- State the prescribed punishment for each identified offence (if available in context)\n"
                    "- Clarify whether offences are cognizable, bailable, or compoundable\n\n"
                    
                    "### Next Steps & Recommendations\n"
                    "1. Immediate actions the user should take\n"
                    "2. How to file an FIR or complaint (procedure from context)\n"
                    "3. Evidence to collect and preserve\n"
                    "4. Timelines and jurisdictional considerations\n"
                    "5. Rights available to the user\n\n"
                    
                    "### Important Considerations\n"
                    "- Potential risks or compliance requirements\n"
                    "- Additional legal implications\n"
                    "- Limitations based on available information\n\n"
                    
                    "## Formatting Rules:\n"
                    "- Use **bold** text for emphasis (with double asterisks)\n"
                    "- Use Markdown headings (###, ##) for sections\n"
                    "- Use bullet points (-) or numbered lists (1., 2., 3.)\n"
                    "- Use tables when comparing multiple provisions\n"
                    "- DO NOT use HTML tags or code blocks unless showing actual code\n"
                    "- Keep responses concise yet comprehensive (500-800 words optimal)\n\n"
                    
                    "## Critical Requirements:\n"
                    "- **Cite Specific Sections**: Always reference exact sections from IPC/CrPC/other acts\n"
                    "- **No Fabrication**: If information is not in the context, explicitly state its absence\n"
                    "- **Legal Reasoning**: Explain the 'why' behind each legal application\n"
                    "- **Mandatory Disclaimer**: Every response must end with:\n\n"
                    
                    "---\n"
                    "**Disclaimer**: This is AI-generated legal information based on available statutory provisions "
                    "and should not be considered a substitute for professional legal advice. Please consult a "
                    "qualified lawyer for case-specific guidance and representation.\n\n"
                    
                    "If the user's role or situation is unclear, provide general information and request clarification "
                    "for more specific guidance."
                )
            },
            {"role": "user", "content": user_message}
        ],
        temperature=0.3,  # Lower temperature for more consistent, focused legal responses
        max_tokens=2048,  # Sufficient for comprehensive 500-800 word responses
        top_p=0.9
    )

    return completion.choices[0].message.content


# Example usage function for RAG-based queries
def get_legal_advice(question: str, context: str):
    """
    Get legal advice based on question and knowledge base context.
    
    Args:
        question (str): User's legal question
        context (str): Retrieved context from vector database/knowledge base
    
    Returns:
        str: Structured legal response
    """
    return get_groq_response(prompt=question, context=context)


# Example usage function for general queries (without RAG)
def get_general_legal_info(question: str):
    """
    Get general legal information without specific knowledge base context.
    
    Args:
        question (str): User's legal question
    
    Returns:
        str: Legal response based on model's knowledge
    """
    return get_groq_response(prompt=question, context="")


# Example usage
if __name__ == "__main__":
    # Example 1: With context (RAG-based)
    sample_context = """
    Section 378 of IPC: Theft
    Whoever, intending to take dishonestly any movable property out of the possession 
    of any person without that person's consent, moves that property in order to such taking, 
    is said to commit theft.
    
    Punishment: Imprisonment up to 3 years, or fine, or both.
    Cognizable: Yes | Bailable: No | Triable by: Any Magistrate
    """
    
    sample_question = "My laptop was stolen from my office. What legal action can I take?"
    
    print("Example 1: RAG-based query")
    print("=" * 80)
    response1 = get_legal_advice(sample_question, sample_context)
    print(response1)
    print("\n\n")
    
    # Example 2: Without context (general query)
    general_question = "What is the process to file an FIR in India?"
    
    print("Example 2: General query")
    print("=" * 80)
    response2 = get_general_legal_info(general_question)
    print(response2)