
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('api/account/', views.get_account_data, name='get_account_data'),  # Account data endpoint
    path('api/transactions/', views.transaction_list, name='transaction_list'),  # Transactions list endpoint
    path('api/user/', views.user_info, name='user_info'),  # User info endpoint
    path('api/banks/', views.bank_list, name='bank_list'),  # Bank list endpoint
    path('api/accounts/', views.account_list, name='account_list'),  # Accounts list endpoint
]
