from rest_framework import serializers
from .models import Record, Template, Schema, RecordType
from patients.models import Patient
from django.contrib.auth import get_user_model
from users.models import Profile


class PatientNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['first_name', 'last_name', 'middle_name']


class SpecialistNameSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()  # Добавьте это

    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name']  # Добавьте 'full_name' в список

    def get_full_name(self, profile):
        user = profile.user
        return f"{user.first_name} {profile.middle_name} {user.last_name}"


class RecordTypeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordType
        fields = ['name']


class RecordSerializer(serializers.ModelSerializer):
    patient_name = PatientNameSerializer(source='patient', read_only=True)
    specialist_name = SpecialistNameSerializer(source='specialist', read_only=True)
    record_type_name = RecordTypeNameSerializer(source='record_type', read_only=True)

    class Meta:
        model = Record
        fields = [
            'id', 'patient_name', 'specialist_name','record_type_name',
            'findings', 'created_at', 'updated_at', 'findings_schema'
            ]


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'


class SchemaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = ['id', 'name']

class SchemaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = '__all__'
