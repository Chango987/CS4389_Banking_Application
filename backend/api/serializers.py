from django.contrib.auth.models import User
from rest_framework import serializers
from .models import bankInfo, transaction, CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        
class bankInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = bankInfo
        fields = "__all__"
        extras_kwargs = {"owner": {"read_only": True}}

class transactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = transaction
        fields = "__all__"
        extras_kwargs = {"sender": {"read_only": True}, "receiver": {"read_only": True}}