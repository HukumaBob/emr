# Generated by Django 4.2.4 on 2024-02-21 14:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0010_record_record_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='findings_schema',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='records.schema'),
        ),
    ]
