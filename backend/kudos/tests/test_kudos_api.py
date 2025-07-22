import pytest
from users.models import User
from kudos.models import Kudos


@pytest.mark.django_db
def test_give_kudos(api_client, user):
    receiver = User.objects.create_user(
        username="test6",
        email="test6@example.com",
        password="test6pass123",
        organization=user.organization,
    )

    payload = {"receiver_id": receiver.id, "message": "Great job!"}

    response = api_client.post("/api/kudos/give/", payload)
    assert response.status_code == 201
    assert Kudos.objects.filter(giver=user, receiver=receiver).exists()


@pytest.mark.django_db
def test_kudos_quota_limit(api_client, user):
    from kudos.utils import get_remaining_kudos

    receiver = User.objects.create_user(
        username="receiver2",
        email="r2@example.com",
        password="password",
        organization=user.organization,
    )

    for _ in range(3):
        api_client.post(
            "/api/kudos/give/", {"receiver_id": receiver.id, "message": "Thanks!"}
        )

    # Fourth should fail
    res = api_client.post(
        "/api/kudos/give/", {"receiver_id": receiver.id, "message": "One more"}
    )
    assert res.status_code == 400
    assert "Weekly kudos limit reached" in res.data["non_field_errors"][0]
