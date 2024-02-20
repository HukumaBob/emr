from django.db import models
import logging
from patients.models import Patient
from organization.models import Department
from users.models import Profile
from jsonschema import validate, ValidationError

logger = logging.getLogger(__name__)


class RecordType(models.Model):
    name = models.CharField(max_length=255)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, null=True, blank=True
        )

    def __str__(self):
        return self.name

class Schema(models.Model):
    name = models.CharField(max_length=255)
    schema = models.JSONField()

    def __str__(self):
        return self.name    


class AbstractRecord(models.Model):
    record_type = models.ForeignKey(
        RecordType, on_delete=models.CASCADE, null=True, blank=True
        )
    findings = models.JSONField(default=dict)
    findings_schema = models.ForeignKey(
        Schema, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='+'
        )

    class Meta:
        abstract = True

    def clean(self):
        super().clean()
        if self.findings_schema:
            try:
                validate(self.findings, self.findings_schema.schema)
            except ValidationError as e:
                logger.error(f"Validation error: {e}")
                raise ValidationError({"findings": str(e)})


class Template(AbstractRecord):

    def __str__(self):  
        return f'Template #{self.id}'


class Record(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    specialist = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
        )
    record_type = models.ForeignKey(
        RecordType, on_delete=models.CASCADE, null=True, blank=True
        )
    findings = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Record #{self.id} - Patient: {self.patient}'

    class Meta:
        ordering = ['-created_at']
