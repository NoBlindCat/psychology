from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)


class UserInfo(models.Model):
    user = models.ForeignKey(User, db_index=True)
    ch_name = models.CharField(max_length=15, null=True)
    email = models.EmailField(null=True)
    birthday = models.DateField(null=True, blank=True)


class PsychologicalFile(models.Model):
    user = models.ForeignKey(User, db_index=True)
    test_time = models.DateField(auto_now_add=True)
    test_level = models.CharField(max_length=10)