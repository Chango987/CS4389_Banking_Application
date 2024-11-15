from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from api import views

urlpatterns = [
    path('token/', views.tokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenObtainPairView.as_view(), name='token_refresh'),
    path('register/', views.registerView.as_view(), name='register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
]
