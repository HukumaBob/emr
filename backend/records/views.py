import json
import os
import shutil
from django.conf import settings
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from .models import Record, Schema, RecordTemplate
from patients.models import Patient
from users.models import Profile
from utils.handle_files_in_json import (
    find_and_replace_files_in_json,
    find_and_replace_url_in_json
    )
from .serializers import (
    RecordSerializer,
    SchemaListSerializer,
    SchemaDetailSerializer,
    RecordTemplateSerializer,
    RecordTemplateListSerializer,
    )
from patients.pagination import StandardResultsSetPagination
from .filters import RecordFilter


DATA_FORMAT = 'data:image/jpeg;'
PREFIX = 'record-file'
FILE_DIRECTORY = 'files'


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = RecordFilter
    file_path = os.path.join(settings.MEDIA_ROOT, FILE_DIRECTORY)

    def get_queryset(self):
        queryset = Record.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset

    def create(self, request, *args, **kwargs):
        patient_id = request.data.get('patient_id')
        if not patient_id:
            return Response(
                {'detail': 'patient_id is required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            patient = Patient.objects.get(id=patient_id)
            user = request.user
            profile = Profile.objects.get(user=user)
        except Patient.DoesNotExist:
            return Response(
                {'detail': 'Patient not found'},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Profile.DoesNotExist:
            return Response(
                {'detail': 'Profile not found'},
                status=status.HTTP_404_NOT_FOUND,
            )

        mutable_data = request.data.copy()
        mutable_data['patient'] = patient.id
        mutable_data['specialist'] = profile.id

        findings = mutable_data.get('findings')
        data_dict = json.loads(findings)

        with transaction.atomic():
            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            record_id = serializer.instance.id
            directory_path = os.path.join(self.file_path, str(record_id))
            os.makedirs(directory_path, exist_ok=True)
            try:
                os.mkdir(directory_path)
            except FileExistsError:
                pass

            data_dict = find_and_replace_files_in_json(
                data_dict, DATA_FORMAT, PREFIX, directory_path
                )

            serializer.instance.findings = data_dict
            serializer.instance.save()
        
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def update_findings(self, request, pk=None):
        record = self.get_object()
        directory_path = os.path.join(self.file_path, str(record.id))
        findings = request.data.get('findings')
        data_dict = json.loads(findings)
        data_dict = find_and_replace_files_in_json(
            data_dict, DATA_FORMAT, PREFIX, directory_path
        )

        record.findings = data_dict
        record.save()

        return Response(self.get_serializer(record).data)

    def retrieve(self, request, *args, **kwargs):
        record = self.get_object()  # Получите объект Record по переданному id
        directory_path = os.path.join(self.file_path, str(record.id))
        serializer = RecordSerializer(record)  # Сериализуйте объект Record

        # Если в данных есть файлы, замените имена файлов на строки base64
        findings = serializer.data.get('findings')
        data_dict = find_and_replace_url_in_json(
            findings, PREFIX, directory_path
        )
        serializer.data['findings'] = data_dict

        return Response(serializer.data)  # Верните сериализованные данные

    def destroy(self, request, *args, **kwargs):
        record = self.get_object()
        record_id = record.id
        directory_path = os.path.join(self.file_path, str(record_id))

        # Удаление директории с файлами
        if os.path.exists(directory_path):
            shutil.rmtree(directory_path)

        # Удаление записи
        response = super().destroy(request, *args, **kwargs)

        return response


class RecordTemplateViewSet(viewsets.ModelViewSet):
    queryset = RecordTemplate.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return RecordTemplateListSerializer
        return RecordTemplateSerializer    

    def get_queryset(self):
        queryset = RecordTemplate.objects.all()
        findings_schema_id = self.request.query_params.get(
            'findings_schema', None
            )
        if findings_schema_id is not None:
            queryset = queryset.filter(findings_schema__id=findings_schema_id)
        return queryset


class SchemaViewSet(viewsets.ModelViewSet):
    queryset = Schema.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaListSerializer
        return SchemaDetailSerializer
