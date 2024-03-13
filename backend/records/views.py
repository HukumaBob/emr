from rest_framework import viewsets
from .models import Record, Schema, RecordTemplate
from .serializers import (
    RecordSerializer,
    SchemaListSerializer,
    SchemaDetailSerializer,
    RecordTemplateSerializer,
    RecordTemplateListSerializer,
    )


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer

    def get_queryset(self):
        queryset = Record.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset


class RecordTemplateViewSet(viewsets.ModelViewSet):
    queryset = RecordTemplate.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return RecordTemplateListSerializer
        return RecordTemplateSerializer    

    def get_queryset(self):
        queryset = RecordTemplate.objects.all()
        findings_schema_id = self.request.query_params.get('findings_schema', None)
        if findings_schema_id is not None:
            queryset = queryset.filter(findings_schema__id=findings_schema_id)
        return queryset


class SchemaViewSet(viewsets.ModelViewSet):
    queryset = Schema.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaListSerializer
        return SchemaDetailSerializer
