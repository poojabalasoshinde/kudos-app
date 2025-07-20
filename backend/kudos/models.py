from django.db import models
from users.models import User

class Kudos(models.Model):
    giver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='kudos_given')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='kudos_received')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Kudos from {self.giver} to {self.receiver} on {self.created_at.date()}"
    

class KudosQuota(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    week_start = models.DateField()
    used = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'week_start')

    def __str__(self):
        return f"{self.user} - {self.week_start}: {self.used}/3"

