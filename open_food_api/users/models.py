from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
# Create your models here.
class User(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)