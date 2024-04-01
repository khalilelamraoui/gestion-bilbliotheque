from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from app.models import Book, Livre, Utilisateur, Emprunt, Exemplaire, Reservation
from app.serializers import ReservationSerializer, UtilisateurSerializer
from app.serializers import BookSerializer
from app.serializers import LivreSerializer
from app.serializers import EmpruntSerializer
from app.serializers import ExemplaireSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    
class LivreViewSet(viewsets.ModelViewSet):
    queryset = Livre.objects.all()
    serializer_class = LivreSerializer
    permission_classes = [AllowAny]

    
class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer
    permission_classes = [AllowAny]
    
class EmpruntViewSet(viewsets.ModelViewSet):
    queryset = Emprunt.objects.all()
    serializer_class = EmpruntSerializer
    permission_classes = [AllowAny]
    
class ExemplaireViewSet(viewsets.ModelViewSet):
    queryset = Exemplaire.objects.all()
    serializer_class = ExemplaireSerializer
    permission_classes = [AllowAny]
    
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [AllowAny]
