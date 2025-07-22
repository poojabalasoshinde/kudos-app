from datetime import datetime, timedelta
from .models import Kudos

WEEKLY_KUDOS_LIMIT = 3


def get_current_week_start():
    today = datetime.utcnow().date()
    return today - timedelta(days=today.weekday())


def get_remaining_kudos(user):
    week_start = get_current_week_start()

    given_this_week = Kudos.objects.filter(
        giver=user, created_at__date__gte=week_start
    ).count()

    remaining = WEEKLY_KUDOS_LIMIT - given_this_week
    return max(0, remaining)
