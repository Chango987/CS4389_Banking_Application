from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('api/account/', views.get_account_data, name='get_account_data'),  # New data endpoint
    path('api/transactions/', views.get_transactions, name='get_transactions'), 
    path('api/user/', views.user_info, name='user-info'),
    path('api/banks/', views.bank_list, name='bank-list'),
]
