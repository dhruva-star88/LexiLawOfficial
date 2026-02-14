from django.urls import path
from .views import prompt_view, DocumentUploadView, AnalyseDocumentView, DocumentAssistantView

urlpatterns = [
    path("prompt/", prompt_view),
    path('upload-document/', DocumentUploadView.as_view(), name='upload-document'),
    path('analyse-document/<int:document_id>/', AnalyseDocumentView.as_view(), name='analyse-document'),
    path('document-assistant/<int:document_id>/', DocumentAssistantView.as_view())
]
