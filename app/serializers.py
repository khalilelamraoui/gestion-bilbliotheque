from rest_framework import serializers

from app.models import Book


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ['name', 'price', 'created', 'updated', 'id']
        read_only_fields = ['created', 'updated', 'id']