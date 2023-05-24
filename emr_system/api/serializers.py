from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from patients.models import Patient
from patients.validators import validate_username


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = (
            'gender', 'first_name', 
            'middle_name', 'last_name',
            'date_of_birth',  'address',
            'phone_number', 'email', 
            'created_at', 'updated_at',
        )