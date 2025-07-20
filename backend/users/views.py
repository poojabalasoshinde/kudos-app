from rest_framework import generics, permissions
from .models import User
from .serializers import RegisterSerializer, MeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = MeSerializer(request.user)
        return Response(serializer.data)

class UserListView(generics.ListAPIView):
    serializer_class = MeSerializer  # You can also create a separate `UserListSerializer` if needed
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(organization=user.organization).exclude(id=user.id)

