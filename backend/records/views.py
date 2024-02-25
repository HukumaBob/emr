from rest_framework import viewsets
from .models import Record, Template, Schema
from .serializers import (
    RecordSerializer, TemplateSerializer,
    SchemaListSerializer, SchemaDetailSerializer
    )


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer

    def get_queryset(self):
        queryset = Record.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


class SchemaViewSet(viewsets.ModelViewSet):
    queryset = Schema.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SchemaListSerializer
        return SchemaDetailSerializer
