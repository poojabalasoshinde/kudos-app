import random
from django.core.management.base import BaseCommand
from faker import Faker
from django.utils.timezone import now, timedelta
from users.models import User
from kudos.models import Kudos
from organizations.models import Organization

fake = Faker()

class Command(BaseCommand):
    help = "Generate demo data: orgs, users, and kudos"

    def handle(self, *args, **kwargs):
        # Clear previous demo data
        Kudos.objects.all().delete()
        User.objects.all().delete()
        Organization.objects.all().delete()

        org_count = random.randint(2, 3)
        self.stdout.write(f"Creating {org_count} organizations...")

        for i in range(org_count):
            org = Organization.objects.create(name=fake.company())
            user_count = random.randint(5, 10)
            self.stdout.write(f"  ↳ Org '{org.name}' → {user_count} users")

            users = []
            for _ in range(user_count):
                user = User.objects.create_user(
                    username=fake.user_name(),
                    email=fake.unique.email(),
                    password="password123",
                    organization=org
                )
                users.append(user)

            # Random kudos from past 2 weeks
            for giver in users:
                receivers = [u for u in users if u != giver]
                given_count = random.randint(0, 3)
                for _ in range(given_count):
                    receiver = random.choice(receivers)
                    message = fake.sentence(nb_words=8)
                    days_ago = random.randint(0, 13)
                    created_at = now() - timedelta(days=days_ago)

                    Kudos.objects.create(
                        giver=giver,
                        receiver=receiver,
                        message=message,
                        created_at=created_at
                    )

        self.stdout.write(self.style.SUCCESS("✅ Demo data generated successfully."))
