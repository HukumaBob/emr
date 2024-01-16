from django.db import models


class Organization(models.Model):
    long_name = models.CharField(max_length=250)
    short_name = models.CharField(max_length=50)
    address = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(blank=True)
    this_one = models.BooleanField(unique=True)

    def __str__(self):
        return f'Organization: {self.short_name}'
    

class Department(models.Model):
    department = models.CharField(max_length=50, blank=False)
    organization = models.ForeignKey(
        Organization, on_delete=models.DO_NOTHING, null=True
        )

    def __str__(self):
        return f'Department: {self.department} ({self.organization})'
    