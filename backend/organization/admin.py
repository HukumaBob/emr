from django.contrib import admin

from .models import Organization, Department


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['department']


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = [
        'long_name',
        'short_name',
        'address',
        'phone_number',
        'email',
    ]
