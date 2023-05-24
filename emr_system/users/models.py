from django.db import models
from django.conf import settings
from organization.models import Department


class Profile(models.Model):
    ROLE_USER = 'user'
    ROLE_DOCTOR = 'doctor'
    ROLE_NURSE = 'nurse'
    ROLE_MANAGER = 'manager'
    ROLE_MODERATOR = 'moderator'
    ROLE_ADMIN = 'admin'
    ROLE_CHOICES = (
        (ROLE_USER, 'User'),
        (ROLE_DOCTOR, 'Doctor'),
        (ROLE_NURSE, 'Nurse'),
        (ROLE_MANAGER, 'Manager'),
        (ROLE_MODERATOR, 'Moderator'),
        (ROLE_ADMIN, 'Admin'),
    )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=ROLE_USER,
    )
    middle_name = models.CharField(max_length=150, blank=True)
    phone_number = models.CharField(max_length=12)
    bio = models.TextField(max_length=500, blank=True)
    medical_field = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True)
    departments = models.ManyToManyField(Department)
    birth_date = models.DateField(null=True, blank=True)

    @property
    def is_moderator(self):
        return self.role == self.ROLE_MODERATOR

    @property
    def is_user(self):
        return self.role == self.ROLE_USER

    @property
    def is_admin(self):
        return self.role == self.ROLE_ADMIN

    @property
    def is_doctor(self):
        return self.role == self.ROLE_DOCTOR

    @property
    def is_nurse(self):
        return self.role == self.ROLE_NURSE

    @property
    def is_manager(self):
        return self.role == self.ROLE_MANAGER

    def __str__(self):
        return f'{self.role}: {self.user}'
