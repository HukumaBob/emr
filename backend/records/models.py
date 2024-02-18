from django.db import models
import logging
from patients.models import Patient
from organization.models import Department
from users.models import Profile
from jsonschema import validate, ValidationError

logger = logging.getLogger(__name__)

class Schema(models.Model):
    name = models.CharField(max_length=255)
    schema = models.JSONField()
    def __str__(self):
        return self.name    

class AbstractRecord(models.Model):
    record_type = models.JSONField(default=dict)
    findings = models.JSONField(default=dict)
    diagnosis = models.JSONField(default=dict)
    recommendations = models.JSONField(default=dict)
    record_type_schema = models.ForeignKey(Schema, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    findings_schema = models.ForeignKey(Schema, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    diagnosis_schema = models.ForeignKey(Schema, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    recommendations_schema = models.ForeignKey(Schema, on_delete=models.SET_NULL, null=True, blank=True, related_name='+')

    class Meta:
        abstract = True

    def clean(self):
        super().clean()
        if self.record_type_schema:
            try:
                validate(self.record_type, self.record_type_schema.schema)
            except ValidationError as e:
                raise ValidationError({"record_type": str(e)})
        if self.findings_schema:
            try:
                validate(self.findings, self.findings_schema.schema)
            except ValidationError as e:
                logger.error(f"Validation error: {e}")
                raise ValidationError({"findings": str(e)})
        if self.diagnosis_schema:
            try:
                validate(self.diagnosis, self.diagnosis_schema.schema)
            except ValidationError as e:
                raise ValidationError({"diagnosis": str(e)})
        if self.recommendations_schema:
            try:
                validate(self.recommendations, self.recommendations_schema.schema)
            except ValidationError as e:
                raise ValidationError({"recommendations": str(e)})

class Template(AbstractRecord):
    specialist = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):  
        return f'Template #{self.id} - Specialist: {self.specialist}'


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
