# Generated by Django 4.2.4 on 2024-03-04 06:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0014_schema_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schema',
            old_name='name',
            new_name='name_old',
        ),
    ]
