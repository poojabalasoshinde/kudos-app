from rest_framework import generics, permissions
from .models import Kudos
from .serializers import GiveKudosSerializer
from datetime import timedelta
from django.utils.dateparse import parse_date
from .utils import get_remaining_kudos
from rest_framework.views import APIView
from rest_framework.response import Response

class GiveKudosView(generics.CreateAPIView):
    queryset = Kudos.objects.all()
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]


class KudosReceivedView(generics.ListAPIView):
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Kudos.objects.filter(receiver=user).order_by('-created_at')
        week_str = self.request.query_params.get("week")
        if week_str:
            week_start = parse_date(week_str)
            if week_start:
                week_end = week_start + timedelta(days=7)
                qs = qs.filter(created_at__date__gte=week_start, created_at__date__lt=week_end)
        return qs



class KudosGivenView(generics.ListAPIView):
    serializer_class = GiveKudosSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Kudos.objects.filter(giver=user).order_by('-created_at')
        week_str = self.request.query_params.get("week")
        if week_str:
            week_start = parse_date(week_str)
            if week_start:
                week_end = week_start + timedelta(days=7)
                qs = qs.filter(created_at__date__gte=week_start, created_at__date__lt=week_end)
        return qs

class KudosQuotaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        remaining = get_remaining_kudos(request.user)
        return Response({"remaining_kudos": remaining})