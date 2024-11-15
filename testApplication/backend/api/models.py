from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import post_save

class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.username
    
class profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(blank=False, null=False, unique=True)
    
    def __str__(self) -> str:
        return self.user.username

def createProfile(sender, instance, created, **kwargs):
    if created:
        profile.objects.create(user=instance)
        
def saveProfile(sender, instance, **kwargs):
    instance.profile.save()
    
post_save.connect(createProfile, sender=User)
post_save.connect(saveProfile, sender=User)