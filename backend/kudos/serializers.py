from rest_framework import serializers
from .models import Kudos, KudosQuota
from users.models import User
from datetime import timedelta
from django.utils.timezone import now
from .utils import get_remaining_kudos


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class GiveKudosSerializer(serializers.ModelSerializer):
    receiver_id = serializers.IntegerField(write_only=True)
    receiver = UserPublicSerializer(read_only=True)
    giver = UserPublicSerializer(read_only=True)

    class Meta:
        model = Kudos
        fields = ['receiver_id', 'message', 'created_at', 'receiver', 'giver']
        read_only_fields = ['created_at', 'receiver', 'giver']

    def validate(self, attrs):
        giver = self.context['request'].user
        receiver_id = attrs['receiver_id']

        if giver.id == receiver_id:
            raise serializers.ValidationError("You cannot give kudos to yourself.")

        if not User.objects.filter(id=receiver_id, organization=giver.organization).exists():
            raise serializers.ValidationError("Receiver does not exist or is not in your organization.")

        # Enforce weekly quota
        # today = now().date()
        # week_start = today - timedelta(days=today.weekday())

        # quota, _ = KudosQuota.objects.get_or_create(user=giver, week_start=week_start)
        # if quota.used >= 3:
        #     raise serializers.ValidationError("Weekly kudos limit reached (3/3).")
        
        if get_remaining_kudos(giver) <= 0:
            raise serializers.ValidationError("Weekly kudos limit reached (3/3).")


        return attrs

    def create(self, validated_data):
        giver = self.context['request'].user
        receiver = User.objects.get(id=validated_data['receiver_id'])

        kudos = Kudos.objects.create(
            giver=giver,
            receiver=receiver,
            message=validated_data['message']
        )

        # update quota
        today = now().date()
        week_start = today - timedelta(days=today.weekday())
        quota, _ = KudosQuota.objects.get_or_create(user=giver, week_start=week_start)
        quota.used += 1
        quota.save()

        return kudos
