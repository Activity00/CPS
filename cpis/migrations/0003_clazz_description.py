# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-12-21 07:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cpis', '0002_auto_20161220_1645'),
    ]

    operations = [
        migrations.AddField(
            model_name='clazz',
            name='description',
            field=models.CharField(default=b'\xe8\xbf\x98\xe6\xb2\xa1\xe6\x9c\x89\xe7\x9b\xb8\xe5\x85\xb3\xe6\x8f\x8f\xe8\xbf\xb0', max_length=100, verbose_name=b'\xe7\x8f\xad\xe7\xba\xa7\xe6\x8f\x8f\xe8\xbf\xb0'),
        ),
    ]