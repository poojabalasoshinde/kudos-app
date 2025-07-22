from datetime import timedelta
from django.utils.dateparse import parse_date

def filter_queryset_by_week(queryset, week_str):
    if not week_str:
        return queryset
    week_start = parse_date(week_str)
    if not week_start:
        return queryset
    week_end = week_start + timedelta(days=7)
    return queryset.filter(created_at__date__gte=week_start, created_at__date__lt=week_end)