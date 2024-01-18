from rest_framework import serializers
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'first_name', 'middle_name', 'last_name',
            'date_of_birth', 'gender', 'address',
            'phone_number', 'email', 'created_at', 'updated_at'
            ]
