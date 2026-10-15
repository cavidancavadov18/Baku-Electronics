from django.db import IntegrityError
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import HomeSerializer, SubscribeSerializer


class HomeView(APIView):
    @extend_schema(responses={200: HomeSerializer})
    def get(self, request):
        return Response(HomeSerializer(instance={}).data)


class SubscribeView(APIView):
    @extend_schema(request=SubscribeSerializer, responses={201: SubscribeSerializer})
    def post(self, request):
        serializer = SubscribeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
            created = True
        except IntegrityError:
            created = False
        return Response({"ok": True, "email": serializer.validated_data["email"]}, status=201 if created else 200)
