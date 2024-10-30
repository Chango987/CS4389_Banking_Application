from django.db import models

class member(models.Model):
    firstName = models.CharField(max_length = 50)
    lastName = models.CharField(max_length = 100)
    email = models.EmailField(max_length = 200, unique = True)
    password = models.CharField(max_length = 50)
    address1 = models.CharField(max_length = 255)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 2)
    postalCode = models.CharField(max_length = 10)
    dateOfBirth = models.DateField()
    ssn = models.CharField(max_length = 9)

    def __str__(self):
        return self.firstName + ' ' + self.lastName
