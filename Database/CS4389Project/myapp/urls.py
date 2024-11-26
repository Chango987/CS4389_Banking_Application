from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('api/account/', views.get_account_data, name='get_account_data'),  # New data endpoint
]
