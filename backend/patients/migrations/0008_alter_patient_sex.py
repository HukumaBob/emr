# Generated by Django 4.2.4 on 2024-02-01 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0007_alter_patient_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='sex',
            field=models.CharField(choices=[('M', 'male'), ('F', 'female'), ('0', 'other')], default='F', max_length=1),
        ),
    ]
