from rest_framework import generics, permissions, status
from .models import User
from .serializers import RegisterSerializer, MeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import IntegrityError


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            return Response(
                {"error": "Duplicate user or organization info."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            serializer = MeSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Something went wrong."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UserListView(generics.ListAPIView):
    serializer_class = MeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(organization=user.organization).exclude(id=user.id)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Unable to fetch users."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
