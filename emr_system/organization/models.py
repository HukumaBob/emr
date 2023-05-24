from django.db import models


class Department(models.Model):
    department = models.CharField(max_length=50, blank=False)
    def __str__(self):
        return f'Department: {self.department}'

class Organization(models.Model):
    long_name = models.CharField(max_length=250)
    short_name = models.CharField(max_length=50)
    address = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(blank=True)
    departments = models.ManyToManyField(Department)

    def __str__(self):
        return f'Organization: {self.short_name}'
