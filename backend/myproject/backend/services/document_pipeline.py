from backend.services.text_extractor import extract_text
from backend.services.text_processor import clean_text, chunk_text
from backend.services.embedding_service import generate_embeddings
from backend.services.vector_store_service import upsert_embeddings

def process_document(document_instance):
    file_path = document_instance.file.path

    # Step 1: Extract
    raw_text = extract_text(file_path)

    if not raw_text:
        return

    # Step 2: Clean
    cleaned_text = clean_text(raw_text)

    # Step 3: Save extracted text
    document_instance.extracted_text = cleaned_text
    document_instance.save()

    # Step 4: Chunk
    chunks = chunk_text(cleaned_text)

    # Step 5: Generate embeddings
    embeddings = generate_embeddings(chunks)
    
    upsert_embeddings(document_instance.id, chunks, embeddings)

    # Later: store in vector DB
    print("Chunks created:", len(chunks))
    print("Embeddings generated:", len(embeddings))
