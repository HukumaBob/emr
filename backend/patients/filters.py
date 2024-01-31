from django_filters.rest_framework import FilterSet, filters
from .models import Patient


class PatientFilter(FilterSet):
    first_name = filters.CharFilter(
        field_name='first_name',
        lookup_expr='istartswith',
        )
    last_name = filters.CharFilter(
        field_name='last_name',
        lookup_expr='istartswith',
        )
    date_of_birth = filters.DateFilter(
        field_name='last_name',
    )

    class Meta:
        model = Patient
        fields = ['first_name', 'last_name', 'date_of_birth']