from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta
from users.models import User
from organizations.models import Organization
from kudos.models import Kudos

class KudosAPITest(APITestCase):
    def setUp(self):
        self.org = Organization.objects.create(name="TestOrg")
        self.user1 = User.objects.create_user(username="alice", password="pass", organization=self.org)
        self.user2 = User.objects.create_user(username="bob", password="pass", organization=self.org)
        self.login()

    def login(self):
        response = self.client.post("/api/token/", {"username": "alice", "password": "pass"})
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_give_kudos_success(self):
        response = self.client.post("/api/kudos/give/", {"receiver_id": self.user2.id, "message": "Great job!"})
        self.assertEqual(response.status_code, 201)

    def test_quota_limit(self):
        for _ in range(3):
            self.client.post("/api/kudos/give/", {"receiver_id": self.user2.id, "message": "👏"})
        response = self.client.post("/api/kudos/give/", {"receiver_id": self.user2.id, "message": "Overflow"})
        self.assertEqual(response.status_code, 400)

    def test_cannot_give_to_self(self):
        response = self.client.post("/api/kudos/give/", {"receiver_id": self.user1.id, "message": "Self kudos"})
        self.assertEqual(response.status_code, 400)
