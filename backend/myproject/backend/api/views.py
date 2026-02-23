from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from backend.services.risk_analysis_service import analyze_document
from ..services.groq_client import get_groq_response
from backend.services.document_pipeline import process_document
from backend.models import UploadedDocument, DocumentAnalysis
from backend.services.retrieval_service import retrieve_relevant_chunks
from backend.services.doc_llm_service import generate_answer
from .serializers import UploadedDocumentSerializer


# =========================
# 🔐 General Prompt Endpoint
# =========================
@api_view(["POST"])
def prompt_view(request):
    try:
        prompt = request.data.get("prompt", "").strip()

        if not prompt:
            return Response(
                {"error": "Prompt is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        model_output = get_groq_response(prompt)

        return Response(
            {"response": model_output},
            status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {"error": "Internal server error.", "details": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# =========================
# 📂 Document Upload
# =========================
class DocumentUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            firebase_uid = request.user.username

            serializer = UploadedDocumentSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(user=request.user)

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

        except Exception as e:
            return Response(
                {"error": "Upload failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# =========================
# 🧠 Analyse Document
# =========================
class AnalyseDocumentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, document_id):
        try:
            firebase_uid = request.user.username

            document = get_object_or_404(
                UploadedDocument,
                id=document_id,
                user=request.user
            )

            if document.status == "processing":
                return Response(
                    {"message": "Document is already being processed."},
                    status=status.HTTP_400_BAD_REQUEST
                )

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
            if 'document' in locals():
                document.status = "failed"
                document.save()

            return Response(
                {"error": "Processing failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# 🤖 Document Assistant (RAG Q&A)

class DocumentAssistantView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, document_id):
        try:
            firebase_uid = request.user.username
            question = request.data.get("question", "").strip()

            if not question:
                return Response(
                    {"error": "Question is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            document = get_object_or_404(
                UploadedDocument,
                id=document_id,
                user=request.user
            )

            chunks = retrieve_relevant_chunks(document.id, question)

            if not chunks:
                return Response(
                    {"error": "No relevant content found."},
                    status=status.HTTP_404_NOT_FOUND
                )

            answer = generate_answer(chunks, question)

            return Response(
                {"answer": answer},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": "Assistant failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class GenerateAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, document_id):
        try:
            # Ensure document belongs to logged-in user
            document = get_object_or_404(
                UploadedDocument,
                id=document_id,
                user=request.user
            )

            # Check if already analyzed
            existing = DocumentAnalysis.objects.filter(document=document).first()
            if existing:
                return Response(existing.analysis_json, status=status.HTTP_200_OK)

            # Run analysis
            result = analyze_document(document)

            # Save to DB
            analysis = DocumentAnalysis.objects.create(
                document=document,
                overall_risk=result["overall_risk"],
                risk_score=result["risk_score"],
                high_risk_items=result["high_risk_items"],
                analysis_json=result
            )

            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "Analysis failed.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )