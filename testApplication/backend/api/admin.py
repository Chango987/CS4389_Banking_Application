from django.contrib import admin
from .models import User, profile

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_editable = ('is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')
    
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number')
    list_editable = ('first_name', 'last_name', 'phone_number')
    search_fields = ('user', 'phone_number')
    
admin.site.register(User, UserAdmin)
admin.site.register(profile, ProfileAdmin)