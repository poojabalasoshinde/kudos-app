import pytest
from users.models import User
from organizations.models import Organization
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from faker import Faker

fake = Faker()


@pytest.fixture
def organization(db):
    return Organization.objects.create(name="TestOrg")


@pytest.fixture
def user(organization):
    return get_user_model().objects.create_user(
        username="testuser",
        email="test@example.com",
        password="password",
        organization=organization,
    )


@pytest.fixture
def api_client(user):
    client = APIClient()
    response = client.post(
        "/api/token/", {"username": user.username, "password": "password"}
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client
