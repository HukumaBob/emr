from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Record, Schema, RecordTemplate
from patients.models import Patient
from .serializers import (
    RecordSerializer,
    SchemaListSerializer,
    SchemaDetailSerializer,
    RecordTemplateSerializer,
    RecordTemplateListSerializer,
    )
from patients.pagination import StandardResultsSetPagination


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Record.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset

def create(self, request, *args, **kwargs):
    patient_id = request.data.get('patient_id')
    if not patient_id:
        return Response({'detail': 'patient_id is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        patient = Patient.objects.get(id=patient_id)
    except Patient.DoesNotExist:
        return Response({'detail': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

    mutable_data = request.data.copy()  # Создайте копию данных запроса
    mutable_data['patient'] = patient.id  # Измените копию данных запроса

    # Замените request.data на mutable_data перед вызовом super().create()
    request._full_data = mutable_data

    return super().create(request, *args, **kwargs)


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
