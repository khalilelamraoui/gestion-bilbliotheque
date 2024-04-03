
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from users.models import CustomUser
from users.serializers import CustomUserSerializer

# Create your views here.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    
