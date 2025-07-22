from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="Email already exists."
            )
        ],
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = ("username", "email", "password", "organization")

    def create(self, validated_data):
        try:
            user = User.objects.create(
                username=validated_data["username"],
                email=validated_data["email"],
                organization=validated_data["organization"],
            )
            user.set_password(validated_data["password"])
            user.save()
            return user
        except Exception as e:
            raise serializers.ValidationError({"detail": str(e)})


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "organization")
