# Generated by Django 4.2.4 on 2024-01-10 16:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organization', '0004_remove_organization_departments'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='departments',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='organization.department'),
            preserve_default=False,
        ),
    ]
