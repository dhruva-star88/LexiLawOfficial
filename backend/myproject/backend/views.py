from rest_framework.decorators import api_view
from rest_framework.response import Response
from .groq_client import get_groq_response

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
