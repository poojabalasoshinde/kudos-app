from kudos.models import KudosQuota
from datetime import timedelta
from django.utils.timezone import now

def update_kudos_quota(giver):
    """
    Increments kudos usage count for the current week for the given user.
    """
    today = now().date()
    week_start = today - timedelta(days=today.weekday())
    
    quota, _ = KudosQuota.objects.get_or_create(user=giver, week_start=week_start)
    quota.used += 1
    quota.save()