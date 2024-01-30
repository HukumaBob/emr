from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.files.storage import default_storage
from rest_framework.decorators import action
# from rest_framework.pagination import PageNumberPagination
# from .pagination import StandardResultsSetPagination
from .models import Patient
from .serializers import PatientSerializer
from .pagination import StandardResultsSetPagination


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    pagination_class = StandardResultsSetPagination

    @action(detail=True, methods=['delete'])
    def delete_photo(self, request, pk=None):
        patient = self.get_object()
        print(patient.photo)
        if patient.photo:
            if default_storage.exists(patient.photo.name):
                print(patient.photo.name)
                default_storage.delete(patient.photo.name)
                if default_storage.exists(patient.photo.name):
                    return Response(
                        {'detail': 'Failed to delete photo'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                        )
            patient.photo = None
            patient.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
