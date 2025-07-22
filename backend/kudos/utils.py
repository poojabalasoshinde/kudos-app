from datetime import timedelta
from django.utils.timezone import now
from .models import KudosQuota

def get_week_start():
    """
    Returns the Monday of the current week.
    """
    today = now().date()
    return today - timedelta(days=today.weekday())

def get_remaining_kudos(user):
    """
    Returns the remaining kudos quota (out of 3) for the user this week.
    """
    week_start = get_week_start()
    quota, _ = KudosQuota.objects.get_or_create(user=user, week_start=week_start)
    return max(0, 5 - quota.used)
