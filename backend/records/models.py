from django.db import models
from patients.models import Patient


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
