from firebase_admin import auth
from rest_framework import authentication, exceptions
from django.contrib.auth.models import User

class FirebaseAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        if not auth_header.startswith("Bearer "):
            return None

        try:
            id_token = auth_header.split(" ")[1]
            decoded_token = auth.verify_id_token(id_token)
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))

        uid = decoded_token["uid"]
        email = decoded_token.get("email", "")

        user, _ = User.objects.get_or_create(
            username=uid,
            defaults={"email": email}
        )

        return (user, None)