from django.contrib import admin

from .models import Record


@admin.register(Record)
class PatientAdmin(admin.ModelAdmin):
    list_display = [
        'patient',
        'procedure_date',
        'diagnosis',
        'recommendations',
    ]
