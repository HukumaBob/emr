from django.contrib import admin

from .models import Record, Template, Schema


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Record._meta.fields]


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Template._meta.fields]

@admin.register(Schema)
class SchemaAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Schema._meta.fields]
