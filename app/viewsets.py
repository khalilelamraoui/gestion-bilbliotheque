from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from app.models import Book

from app.serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]