from django.db import models

class member(models.Model):
    firstName = models.CharField(max_length = 50)
    lastName = models.CharField(max_length = 100)
    email = models.EmailField(max_length = 200)
    password = models.CharField(max_length = 50)

    def __str__(self):
        return self.firstName + ' ' + self.lastName
