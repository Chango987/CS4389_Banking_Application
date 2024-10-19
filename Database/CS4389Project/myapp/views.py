from django.shortcuts import render
from .forms import member_form
from .models import member

def members(request):
    allMember = member.objects.all
    return render(request, 'member.html', {'all':allMember})

def join(request):
    if request.method == "POST":
        form = member_form(request.POST or None)
        if form.is_valid():
            form.save()
        return render(request, 'join.html', {})

    else:
        return render(request, 'join.html', {})