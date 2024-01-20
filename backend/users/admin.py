from django.contrib import admin

from .models import Profile, Position, MedicalField

admin.site.site_header = 'Site administration EMR'


# @admin.register(Profile)
# class ProfileAdmin(admin.ModelAdmin):
#     list_display = ['user', 'role']


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(MedicalField)
class MedicalFieldAdmin(admin.ModelAdmin):
    list_display = ['name', 'role']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "medical_field":
            if request._obj_ is not None:
                kwargs["queryset"] = MedicalField.objects.filter(role=request._obj_.role)
            else:
                kwargs["queryset"] = MedicalField.objects.none()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_form(self, request, obj=None, **kwargs):
        request._obj_ = obj
        return super().get_form(request, obj, **kwargs)

# admin.site.register(Profile, ProfileAdmin)    
