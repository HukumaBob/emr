from rest_framework import viewsets
# from rest_framework.pagination import PageNumberPagination
# from .pagination import StandardResultsSetPagination
from .models import Patient
from .serializers import PatientSerializer
from .pagination import StandardResultsSetPagination

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    pagination_class = StandardResultsSetPagination
    
