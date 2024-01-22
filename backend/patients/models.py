from django.db import models


class Patient(models.Model):
    class Sex(models.TextChoices):
        MALE = 'M', 'male'
        FEMALE = 'F', 'female'        

    first_name = models.CharField(max_length=100, blank=True, null=True, )
    middle_name = models.CharField(max_length=100, blank=True, null=True, )
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    sex = models.CharField(
        max_length=1,
        choices=Sex.choices,
        default=Sex.FEMALE
    )
    photo = models.ImageField(upload_to='images/patients_profile/')
    address = models.CharField(max_length=200, blank=True, null=True, )
    phone_number = models.CharField(max_length=20, blank=True, null=True, )
    email = models.EmailField(blank=True, null=True, )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        ordering = ['-created_at']

