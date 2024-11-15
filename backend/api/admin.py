from django.contrib import admin
from .models import bankInfo, transaction, User
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Unregister the default User model if registered
try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass  # Default User is not registered, so ignore this error

# Register the custom user model
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Customize the admin interface here
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number', 'address', 'date_of_birth')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number', 'address', 'date_of_birth')}),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'date_of_birth', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'phone_number')
    ordering = ('username',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(bankInfo)
admin.site.register(transaction)
admin.site.register(User)