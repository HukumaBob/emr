# Generated by Django 4.2.4 on 2024-01-19 12:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0007_department_organization'),
        ('users', '0014_alter_profile_departments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='departments',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='organization.department'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='medical_field',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='users.medicalfield'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='profile',
            name='position',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.position'),
        ),
    ]