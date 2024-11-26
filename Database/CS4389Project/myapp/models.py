from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import re
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username=username, email=email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

def validate_ssn(value):
    ssn_pattern = re.compile(r'^\d{3}-\d{2}-\d{4}$')
    if not ssn_pattern.match(value):
        raise ValidationError('Invalid SSN format. It should be XXX-XX-XXXX.')

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address = models.CharField(max_length=255)
    social_security_number = models.CharField(max_length=255, validators=[validate_ssn])

    def save(self, *args, **kwargs):
        self.social_security_number = make_password(self.social_security_number)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Account(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='accounts')
    name = models.CharField(max_length=50)  # New field for front-end compatibility
    account_number = models.CharField(max_length=128)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    mask = models.CharField(max_length=4, blank=True)  # Last 4 digits of account_number
    sender_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def save(self, *args, **kwargs):
        if not self.mask:
            self.mask = self.account_number[-4:]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.account_number})"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'currentBalance': str(self.balance),
            'mask': self.mask,
            'appwriteItemId': str(self.sender_id),
        }

class Transaction(models.Model):
    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    sender = models.ForeignKey(Account, related_name='sent_transactions', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Account, related_name='received_transactions', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Transaction {self.transaction_id}"

    def to_dict(self):
        return {
            'transaction_id': str(self.transaction_id),
            'sender': self.sender.to_dict(),
            'receiver': self.receiver.to_dict(),
            'date': self.date.isoformat(),
            'amount': str(self.amount),
        }

@receiver(post_save, sender=Transaction)
def adjust_balances(sender, instance, **kwargs):
    if instance.sender.balance >= instance.amount:
        instance.sender.balance -= instance.amount
        instance.receiver.balance += instance.amount
        instance.sender.save()
        instance.receiver.save()
    else:
        raise ValueError("Insufficient funds for the transaction")
