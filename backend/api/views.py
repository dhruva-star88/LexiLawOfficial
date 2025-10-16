# backend/api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthCheckView(APIView):
    """A simple health check endpoint to confirm the API is running."""
    def get(self, request, *args, **kwargs):
        return Response(
            {"status": "ok", "message": "LexiLaw API is running"},
            status=status.HTTP_200_OK
        )