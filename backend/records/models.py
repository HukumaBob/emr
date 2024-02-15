from django.db import models
from patients.models import Patient
from organization.models import Department
from users.models import Profile


class AbstractRecord(models.Model):
    record_type = models.JSONField(default=dict)
    findings = models.JSONField(default=dict)
    diagnosis = models.JSONField(default=dict)
    recommendations = models.JSONField(default=dict)

    class Meta:
        abstract = True


class Record(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, null=True, blank=True
        )
    record_type = models.JSONField(default=dict)
    specialist = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
        )
    findings = models.JSONField(default=dict)
    diagnosis = models.JSONField(default=dict)
    recommendations = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Record #{self.id} - Patient: {self.patient}'

    class Meta:
        ordering = ['-created_at']


class Template(AbstractRecord):
    specialist = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return f'Template #{self.id} - Specialist: {self.specialist}'