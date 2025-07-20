from django.urls import path
from .views import GiveKudosView, KudosReceivedView, KudosGivenView, KudosQuotaView

urlpatterns = [
    path("give/", GiveKudosView.as_view(), name="give-kudos"),
    path("received/", KudosReceivedView.as_view(), name="kudos-received"),
    path("given/", KudosGivenView.as_view(), name="kudos-given"),
    path("quota/", KudosQuotaView.as_view(), name="kudos-quota"),
]
