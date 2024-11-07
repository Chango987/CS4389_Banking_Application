from django.shortcuts import render
from .forms import member_form
from .models import member
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def members(request):
    allMember = member.objects.all
    return render(request, 'member.html', {'all':allMember})

def join(request):
    if request.method == "POST":
        form = member_form(request.POST or None)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True, 'message': 'Successful registration'})
        else:
            return JsonResponse({'success': False, 'message': 'Error registration'}, status=400)
        return render(request, 'join.html', {})

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
