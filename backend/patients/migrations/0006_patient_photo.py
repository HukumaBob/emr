# Generated by Django 4.2.4 on 2024-01-22 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0005_rename_gender_patient_sex'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='photo',
            field=models.ImageField(default=0, upload_to='images/patients_profile/'),
            preserve_default=False,
        ),
    ]