from patients.models import Patient
from django.core.management.base import BaseCommand
from mixer.backend.django import mixer
from faker import Faker  # Подключаем Faker для генерации случайных данных

fake = Faker()


class Command(BaseCommand):
    help = 'Generate test data'

    def handle(self, *args, **options):
        # Генерация пользователей
        for _ in range(100):
            mixer.blend(
                Patient,
                first_name=fake.first_name(),
                middle_name=fake.first_name(),
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(),
                gender=fake.random_element(elements=('M', 'F', 'O')),
                address=fake.address(),
                phone_number=fake.phone_number(),
                email=fake.email(),
            )
