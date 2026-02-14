from backend.services.embedding_service import generate_embeddings
from backend.services.vector_store_service import index


def retrieve_relevant_chunks(document_id, question, top_k=3):

    # Generate embedding for question
    query_embedding = generate_embeddings([question])[0]

    print("Query embedding generated")

    # Query Pinecone with document filter
    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True,
        filter={"document_id": document_id}
    )

    print("Pinecone query results:", results)

    chunks = []
    for match in results["matches"]:
        chunks.append(match["metadata"]["text"])

    return chunks
