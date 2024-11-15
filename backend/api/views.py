from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, bankInfoSerializer, transactionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import bankInfo, transaction, CustomUser
from django.contrib.auth.hashers import make_password

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class BankInfoView(generics.ListCreateAPIView):
    serializer_class = bankInfoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return bankInfo.objects.filter(member__username=self.request.user)
    
class TransactionView(generics.ListCreateAPIView):
    serializer_class = transactionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return transaction.objects.filter(sender__owner__username=self.request.user)