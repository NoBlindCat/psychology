# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sysadmin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PsychologicalFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('test_time', models.DateField(auto_now_add=True)),
                ('test_level', models.CharField(max_length=10)),
                ('user', models.ForeignKey(to='sysadmin.User')),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ch_name', models.CharField(max_length=15, null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('birthday', models.DateField(null=True, blank=True)),
                ('user', models.ForeignKey(to='sysadmin.User')),
            ],
        ),
    ]
