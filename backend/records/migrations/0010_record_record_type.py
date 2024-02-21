# Generated by Django 4.2.4 on 2024-02-19 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0009_remove_record_department'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='record_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='records.recordtype'),
        ),
    ]