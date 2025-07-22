# organizations/views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Organization
from .serializers import OrganizationSerializer


class OrganizationListCreateView(generics.ListCreateAPIView):
    queryset = Organization.objects.all().order_by("-created_at")
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        org = self.get_object()
        self.perform_destroy(org)
        return Response(status=status.HTTP_204_NO_CONTENT)
