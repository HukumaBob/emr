from django.contrib import admin

from .models import Profile, Position, MedicalField

admin.site.site_header = 'Site administration EMR'


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(MedicalField)
class MedicalFieldAdmin(admin.ModelAdmin):
    list_display = ['name']
