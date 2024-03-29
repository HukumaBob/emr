# Generated by Django 4.2.4 on 2024-01-19 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0007_department_organization'),
        ('users', '0013_alter_profile_departments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='departments',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='organization.department'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='medical_field',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.medicalfield'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='position',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.position'),
        ),
    ]
