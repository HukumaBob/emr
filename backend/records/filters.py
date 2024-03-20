from django_filters.rest_framework import FilterSet, filters
from .models import Record


class RecordFilter(FilterSet):
    findings_schema__name = filters.CharFilter(
        field_name='findings_schema__name',
        lookup_expr='contains',
        )
    date_of_record = filters.DateFromToRangeFilter(
        field_name='created_at',
    )

    class Meta:
        model = Record
        fields = ['findings_schema__name', 'date_of_record']