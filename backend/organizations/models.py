from django.db import models

class Organization(models.Model):
    """
    Represents a company or group. Users belong to one organization.
    """
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
