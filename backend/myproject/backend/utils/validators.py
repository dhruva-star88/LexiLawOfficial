import os
from rest_framework import serializers

ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx']
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def validate_file(value):
    ext = os.path.splitext(value.name)[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise serializers.ValidationError(
            "Only PNG, JPG, JPEG, PDF, DOC, DOCX files are allowed."
        )

    if value.size > MAX_FILE_SIZE:
        raise serializers.ValidationError(
            "File size must be under 10MB."
        )

    return value
