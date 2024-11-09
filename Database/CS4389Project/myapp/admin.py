from django.contrib import admin
from .models import UserInfo, MemberInfo, BankInfo, Transaction

admin.site.register(UserInfo)
admin.site.register(MemberInfo)
admin.site.register(BankInfo)
admin.site.register(Transaction)
