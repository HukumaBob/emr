from django.db import models
from django.conf import settings
from organization.models import Department


class Position(models.Model):
    """ F.e. Head of Department. """
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name}'

class MedicalField(models.Model):
    """ F.e. gastroenterologist. """
    name = models.CharField(max_length=100)
    def __str__(self):
        return f'{self.name}'


class Profile(models.Model):
    class Role(models.TextChoices):
        ROLE_USER = 'US', 'user'
        ROLE_DOCTOR = 'DC', 'doctor'
        ROLE_NURSE = 'NS', 'nurse'
        ROLE_MANAGER = 'MN', 'manager'
        ROLE_ADMIN = 'AD', 'admin'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.ROLE_USER,
    )
    middle_name = models.CharField(max_length=150, blank=True)
    phone_number = models.CharField(max_length=12)
    bio = models.TextField(max_length=500, blank=True)
    medical_field = models.OneToOneField(
        MedicalField,
        on_delete=models.SET_NULL,  blank=True, null=True
    )
    position = models.OneToOneField(
        Position,
        on_delete=models.SET_NULL, blank=True, null=True
    )
    departments = models.OneToOneField(
        Department,
        on_delete=models.SET_NULL, null=True, blank=True
    )
    birth_date = models.DateField(null=True, blank=True)

    @property
    def is_user(self):
        return self.role == self.Role.ROLE_USER

    @property
    def is_admin(self):
        return self.role == self.Role.ROLE_ADMIN

    @property
    def is_doctor(self):
        return self.role == self.Role.ROLE_DOCTOR

    @property
    def is_nurse(self):
        return self.role == self.Role.ROLE_NURSE

    @property
    def is_manager(self):
        return self.role == self.Role.ROLE_MANAGER

    def __str__(self):
        return f'{self.role}: {self.user}'
