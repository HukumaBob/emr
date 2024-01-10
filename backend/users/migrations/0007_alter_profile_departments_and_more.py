# Generated by Django 4.2.4 on 2024-01-07 12:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0003_alter_organization_this_one'),
        ('users', '0006_alter_profile_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='departments',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='organization.department'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='medical_field',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.medicalfield'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='position',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.position'),
        ),
    ]
