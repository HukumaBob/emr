import csv
from django.core.management.base import BaseCommand
from django.conf import settings
from users.models import MedicalField, Role

csv_file_path = settings.BASE_DIR / 'data/specialites.csv'


class Command(BaseCommand):
    help = 'Generate test data'
    
    def handle(self, *args, **kwargs):
        with open(csv_file_path, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                _, specialty = row
                MedicalField.objects.create(
                    name=specialty.lower(),
                    role=Role.ROLE_DOCTOR
                    )
