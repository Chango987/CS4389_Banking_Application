
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Bank, Account, Transaction  # Replace with your actual models
from django.core.serializers import serialize
from django.forms.models import model_to_dict

@csrf_exempt  # Allow frontend to make POST requests without CSRF token
def login_view(request):
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

# Fetch user info
def user_info(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    user = model_to_dict(request.user, fields=['id', 'first_name', 'last_name', 'email'])
    return JsonResponse(user)

# Fetch bank list
def bank_list(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    banks = Bank.objects.filter(user=request.user)
    bank_data = [model_to_dict(bank) for bank in banks]
    return JsonResponse(bank_data, safe=False)

# Fetch accounts list
def account_list(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    accounts = Account.objects.filter(user=request.user)
    account_data = [model_to_dict(account) for account in accounts]
    return JsonResponse(account_data, safe=False)

# Fetch transactions
def transaction_list(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Unauthorized'}, status=401)

    transactions = Transaction.objects.filter(account__user=request.user)
    transaction_data = [model_to_dict(transaction) for transaction in transactions]
    return JsonResponse(transaction_data, safe=False)
