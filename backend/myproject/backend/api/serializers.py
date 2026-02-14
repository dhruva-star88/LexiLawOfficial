from rest_framework import serializers
from ..models import UploadedDocument
from ..utils.validators import validate_file

class UploadedDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(validators=[validate_file])

    class Meta:
        model = UploadedDocument
        fields = ['id', 'file', 'uploaded_at']
