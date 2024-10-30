from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.members, name='member'),
    path('join/', views.join, name='join'),
    path('login/', views.login, name='login')
]
