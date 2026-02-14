from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..services.groq_client import get_groq_response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UploadedDocumentSerializer
from django.shortcuts import get_object_or_404
from backend.services.document_pipeline import process_document
from backend.models import UploadedDocument
from backend.services.retrieval_service import retrieve_relevant_chunks
from backend.services.doc_llm_service import generate_answer


@api_view(["POST"])
def prompt_view(request):
    try:
        prompt = request.data.get("prompt", "")
        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)
        model_output = get_groq_response(prompt)
        return Response({"response": model_output})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
class DocumentUploadView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UploadedDocumentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "File uploaded successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class AnalyseDocumentView(APIView):

    def post(self, request, document_id):

        document = get_object_or_404(UploadedDocument, id=document_id)

        if document.status == "processing":
            return Response(
                {"message": "Document is already being processed."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            document.status = "processing"
            document.save()

            process_document(document)

            document.status = "completed"
            document.save()

            return Response(
                {"message": "Document processed successfully."},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            document.status = "failed"
            document.save()

            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class DocumentAssistantView(APIView):

    def post(self, request, document_id):

        question = request.data.get("question")

        if not question:
            return Response(
                {"error": "Question is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Retrieve relevant chunks
        chunks = retrieve_relevant_chunks(document_id, question)

        if not chunks:
            return Response(
                {"error": "No relevant content found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Generate answer using Groq
        answer = generate_answer(chunks, question)

        return Response(
            {
                "answer": answer
            },
            status=status.HTTP_200_OK
        )