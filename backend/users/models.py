from django.contrib.auth.models import AbstractUser
from django.db import models
from organizations.models import Organization

class User(AbstractUser):
    """
    Custom user model extending Django's default user.
    Each user belongs to an organization and can give/receive kudos.
    """
    email = models.EmailField(unique=True)
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name='members',
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.username} ({self.organization.name if self.organization else 'No Org'})"
