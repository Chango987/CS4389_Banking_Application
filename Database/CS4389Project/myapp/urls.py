from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('api/send_payment/', views.send_payment, name='send_payment')
]
