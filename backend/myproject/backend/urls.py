from django.urls import path
from .views import prompt_view

urlpatterns = [
    path("prompt/", prompt_view),
]
