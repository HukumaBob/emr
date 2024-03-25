from django.db import models
import logging
from patients.models import Patient
from organization.models import Department
from users.models import Profile
# from jsonschema import validate, ValidationError
from pytils.translit import slugify
from utils.validators import compile_with_custom_formats

logger = logging.getLogger(__name__)


class ValidationError(Exception):
    pass


class Schema(models.Model):
    name = models.CharField(max_length=255)
    name_slug = models.SlugField(
        max_length=255, unique=True, null=True, blank=True
        )
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, null=True, blank=True
        )
    schema = models.JSONField(default=dict)
    ui_schema = models.JSONField(default=dict, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.name_slug:
            self.name_slug = slugify(self.name)
        super().save(*args, **kwargs)    

    def __str__(self):
        return str(self.name)


class AbstractRecord(models.Model):
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
                validate = compile_with_custom_formats(
                    self.findings_schema.schema
                    )
                validate(self.findings)
            except Exception as e:
                logger.error(f"Validation error: {e}")
                raise ValidationError({"findings": str(e)})    


class RecordTemplate(AbstractRecord):
    template_name = models.CharField(max_length=255)
    template_slug = models.SlugField(max_length=255, unique=True)
    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, null=True,
        blank=True, related_name='+'
        )

    def save(self, *args, **kwargs):
        if not self.template_slug:
            self.template_slug = slugify(self.template_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return str(self.template_name)


class Record(AbstractRecord):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    specialist = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Record #{self.id} - Patient: {self.patient}'

    class Meta:
        ordering = ['-created_at']

