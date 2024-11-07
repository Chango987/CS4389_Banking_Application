from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

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
