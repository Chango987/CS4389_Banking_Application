from django.utils import timezone
import uuid
from django.db import models
from django.contrib.auth.models import User,AbstractUser

class CustomUser(AbstractUser):
    # Add any custom fields you need here
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.username

class bankInfo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=128)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    sender_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"{self.account_number}"

class transaction(models.Model):
    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    sender = models.ForeignKey(bankInfo, related_name='sent_transactions', on_delete=models.CASCADE)
    receiver = models.ForeignKey(bankInfo, related_name='received_transactions', on_delete=models.CASCADE)
    date = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Transaction {self.transaction_id}"