from django.contrib import admin

from .models import Record, Schema, RecordTemplate


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Record._meta.fields]


@admin.register(RecordTemplate)
class RecordTemplateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in RecordTemplate._meta.fields]

@admin.register(Schema)
class SchemaAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Schema._meta.fields]
