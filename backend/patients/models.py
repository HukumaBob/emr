from email.policy import default

from django.db import models


class Patient(models.Model):
    class Gender(models.TextChoices):
        MALE = 'M', 'male'
        FEMALE = 'F', 'female'
        OTHER = 'O', 'other'

    first_name = models.CharField(max_length=100, blank=True, null=True, )
    middle_name = models.CharField(max_length=100, blank=True, null=True, )
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(
        max_length=1,
        choices=Gender.choices,
        default=Gender.FEMALE
    )
    address = models.CharField(max_length=200, blank=True, null=True, )
    phone_number = models.CharField(max_length=20, blank=True, null=True, )
    email = models.EmailField(blank=True, null=True, )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        ordering = ['-created_at']


class Record(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    procedure_date = models.DateField()
    findings = models.TextField()
    diagnosis = models.TextField()
    recommendations = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Record #{self.id} - Patient: {self.patient}'

    class Meta:
        ordering = ['-created_at']
