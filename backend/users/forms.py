"""
Здесь надо будет создать форму для заполнения User + Profile 
одномоментно для использования в админпанели
"""

# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# from django.contrib import admin
# from .models import Profile

# class CustomUserCreationForm(UserCreationForm):
#     first_name = forms.CharField(max_length=30, required=True, help_text='Required.')
#     last_name = forms.CharField(max_length=30, required=True, help_text='Required.')
#     email = forms.EmailField(max_length=254, required=True, help_text='Required. Enter a valid email address.')

#     class Meta:
#         model = User
#         fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

# class ProfileForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = '__all__'

# class CustomProfileAdminForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = '__all__'

# class CustomProfileAdmin(admin.ModelAdmin):
#     form = CustomProfileAdminForm

# admin.site.register(Profile, CustomProfileAdmin)
