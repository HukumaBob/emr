# Generated by Django 4.2.3 on 2023-07-31 10:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='record',
            options={'ordering': ['-created_at']},
        ),
    ]