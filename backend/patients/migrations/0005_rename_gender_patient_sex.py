# Generated by Django 4.2.4 on 2024-01-19 08:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0004_alter_patient_gender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='gender',
            new_name='sex',
        ),
    ]
