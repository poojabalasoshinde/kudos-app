from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.utils.dateparse import parse_date
from django.core.exceptions import ObjectDoesNotExist
from .models import Kudos
from .serializers import GiveKudosSerializer
from .utils import get_remaining_kudos
from kudos.services.query_filters import filter_queryset_by_week


class GiveKudosView(generics.CreateAPIView):
    queryset = Kudos.objects.all()
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response(
                {"detail": str(e.detail)}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class KudosReceivedView(generics.ListAPIView):
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Kudos.objects.filter(receiver=user).order_by("-created_at")
        return filter_queryset_by_week(qs, self.request.query_params.get("week"))


class KudosGivenView(generics.ListAPIView):
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Kudos.objects.filter(giver=user).order_by("-created_at")
        return filter_queryset_by_week(qs, self.request.query_params.get("week"))


class KudosQuotaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            remaining = get_remaining_kudos(request.user)
            return Response({"remaining_kudos": remaining}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
