from rest_framework import viewsets
from .models import Record
from .serializers import RecordSerializer


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer

    def get_queryset(self):
        queryset = Record.objects.all()
        patient_id = self.request.query_params.get('patient_id', None)
        if patient_id is not None:
            queryset = queryset.filter(patient__id=patient_id)
        return queryset
