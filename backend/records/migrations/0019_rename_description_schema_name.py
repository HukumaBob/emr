# Generated by Django 4.2.4 on 2024-03-04 06:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0018_rename_name_schema_name_old'),
    ]

    operations = [
        migrations.RenameField(
            model_name='schema',
            old_name='description',
            new_name='name',
        ),
    ]