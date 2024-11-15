from django.urls import path
from . import views

urlpatterns = [
    path("userinfo/", views.CreateUserView.as_view(), name="userinfo"),
    path("bankinfo/", views.BankInfoView.as_view(), name="bankinfo"),
    path("transactions/", views.TransactionView.as_view(), name="transactions"),
]
