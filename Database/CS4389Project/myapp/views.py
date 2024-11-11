from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import BankInfo, Transaction

def login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Successful login'})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid login'}, status=400)
    return JsonResponse({'error': 'POST request required'}, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_payment(request):
    sender_id = request.data.get('sender_id')
    receiver_id = request.data.get("receiver_id")
    amount = request.data.get("amount")

    try:
        amount = float(amount)  # Ensure amount is a float
        if amount <= 0:
            return Response({"error": "Amount must be positive"}, status=status.HTTP_400_BAD_REQUEST)

        sender = BankInfo.objects.get(sender_id=sender_id)
        receiver = BankInfo.objects.get(sender_id=receiver_id)

        if sender.balance < amount:
            return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)

        # Atomic transaction
        with transaction.atomic():
            sender.balance -= amount
            receiver.balance += amount
            sender.save()
            receiver.save()

            transaction = Transaction.objects.create(sender=sender, receiver=receiver, amount=amount)

        return Response({"transaction_id": str(transaction.transaction_id)}, status=status.HTTP_201_CREATED)

    except BankInfo.DoesNotExist:
        return Response({"error": "Invalid sender or receiver"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"error": "Invalid amount format"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
