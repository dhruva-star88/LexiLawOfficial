from django.db import models
from django.conf import settings
import uuid

def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return f"documents/{new_filename}"


class UploadedDocument(models.Model):

    STATUS_CHOICES = [
        ("uploaded", "Uploaded"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="uploaded_documents"
    )

    file = models.FileField(upload_to=upload_to)
    extracted_text = models.TextField(null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="uploaded"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
    
class DocumentAnalysis(models.Model):
    document = models.ForeignKey(
        "UploadedDocument",
        on_delete=models.CASCADE,
        related_name="analysis"
    )

    overall_risk = models.CharField(max_length=20)
    risk_score = models.FloatField()
    high_risk_items = models.IntegerField()

    analysis_json = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis for Document {self.document.id}"