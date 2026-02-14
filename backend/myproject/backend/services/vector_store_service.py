from pinecone import Pinecone, ServerlessSpec
import os

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "lexilaw-index"

# Create index if not exists
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,  # Must match embedding model
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

index = pc.Index(index_name)


def upsert_embeddings(document_id, chunks, embeddings):
    vectors = []

    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        vectors.append({
            "id": f"{document_id}_{i}",
            "values": embedding,
            "metadata": {
                "text": chunk,
                "document_id": document_id
            }
        })

    print(f"Preparing to upsert {len(vectors)} vectors to Pinecone for document {document_id}")

    response = index.upsert(vectors)

    print("Pinecone upsert response:", response)

    return response
