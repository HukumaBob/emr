# Generated by Django 4.2.3 on 2023-07-27 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0001_initial'),
        ('users', '0002_medicalfield_position_remove_profile_departments_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='departments',
        ),
        migrations.AddField(
            model_name='profile',
            name='departments',
            field=models.ManyToManyField(to='organization.department'),
        ),
    ]
