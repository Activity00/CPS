# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-12-30 13:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cpis', '0005_auto_20161228_1314'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='c_t',
            options={'verbose_name': '\u6559\u5e08_\u8bfe\u7a0b', 'verbose_name_plural': '\u6559\u5e08_\u8bfe\u7a0b\u8868'},
        ),
        migrations.AlterField(
            model_name='practicerecord',
            name='position',
            field=models.CharField(max_length=30, verbose_name=b'\xe7\xad\x94\xe9\xa2\x98\xe4\xba\xba\xe7\xbb\x8f\xe7\xba\xac\xe5\xba\xa6'),
        ),
        migrations.AlterField(
            model_name='pubpractice',
            name='forclass',
            field=models.CharField(default=b'', max_length=20, verbose_name=b'\xe9\x92\x88\xe5\xaf\xb9\xe7\x8f\xad\xe7\xba\xa7'),
        ),
        migrations.AlterField(
            model_name='pubpractice',
            name='publish_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name=b'\xe5\x8f\x91\xe5\xb8\x83\xe6\x97\xa5\xe6\x9c\x9f'),
        ),
    ]