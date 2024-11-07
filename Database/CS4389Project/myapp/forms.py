from django import forms
from .models import member

class member_form(forms.ModelForm):
    class Meta:
        model = member
        fields = ['firstName', 'lastName', 'email', 'password', 'address1', 'city', 'state', 'postalCode', 'dateOfBirth', 'ssn']
        widgets = {
            'password': forms.PasswordInputs(),
            'dateOfBirth': forms.DateInput(attrs{'type': 'date'})
        }
