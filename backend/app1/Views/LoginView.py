from rest_framework_simplejwt.views import TokenViewBase

from app1.serailizer import MyTokenObtainPairSerializer


class LoginView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer
