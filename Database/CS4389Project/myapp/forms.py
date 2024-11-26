from django import forms
from .models import MemberInfo  # Correct model name

class MemberForm(forms.ModelForm):
    class Meta:
        model = MemberInfo  # Correct model
        fields = ['first_name', 'last_name', 'email', 'password']  # Correct field names
