from rest_framework import serializers
from .models import Record, Schema, RecordTemplate
from patients.models import Patient
from django.contrib.auth import get_user_model
from users.models import Profile


class PatientNameSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    middle_name = serializers.CharField(required=False)

    class Meta:
        model = Patient
        fields = ['first_name', 'last_name', 'middle_name']


class SpecialistNameSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name']

    def get_full_name(self, profile):
        user = profile.user
        return f"{user.first_name} {profile.middle_name} {user.last_name}"


class RecordSerializer(serializers.ModelSerializer):
    patient_name = PatientNameSerializer(source='patient', required=False)
    patient_id = serializers.IntegerField(write_only=True)
    specialist_name = SpecialistNameSerializer(
        source='specialist', read_only=True
        )
    findings_schema_name = serializers.StringRelatedField(
        source='findings_schema'
        )

    class Meta:
        model = Record
        fields = [
            'id', 'patient_id', 'patient_name', 'specialist_name',
            'findings', 'created_at', 'updated_at',
            'findings_schema', 'findings_schema_name'
            ]


class RecordTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordTemplate
        fields = '__all__'


class RecordTemplateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordTemplate
        fields = ['id', 'template_name']


class SchemaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = ['id', 'name']


class SchemaDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schema
        fields = '__all__'
