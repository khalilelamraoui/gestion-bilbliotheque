from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from app.models import Menu

from app.serializers import MenuSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [AllowAny]