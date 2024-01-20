from rest_framework import serializers
from django.contrib.auth.models import User

from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        source='user.first_name', read_only=True
        )
    last_name = serializers.CharField(
        source='user.last_name', read_only=True
        )
    username = serializers.CharField(
        source='user.username', read_only=True
        )
    role = serializers.CharField(
        source='get_role_display', read_only=True
        )
    medical_field = serializers.StringRelatedField(
        read_only=True
        )
    position = serializers.StringRelatedField(
        read_only=True
        )

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'username',
            'role',
            'medical_field',
            'position'
            ]
