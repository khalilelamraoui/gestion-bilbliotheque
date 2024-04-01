from rest_framework import serializers

from app.models import Book, Livre, Utilisateur, Emprunt, Exemplaire, Reservation

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = ['name', 'quantity', 'created', 'updated', 'id']
        read_only_fields = ['created', 'updated', 'id']

class LivreSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Livre
            fields = ['titre', 'auteurs', 'editeur', 'date_publication', 'isbn', 'genre', 'langue', 'resume', 'disponibilite', 'emplacement', 'image_couverture', 'id']
            read_only_fields = ['id']


class UtilisateurSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Utilisateur
            fields = ['massar', 'cin', 'nom', 'prenom', 'email', 'telephone', 'type_utilisateur', 'password', 'last_login', 'historique_emprunts', 'id']
            read_only_fields = ['last_login', 'id']

class EmpruntSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Emprunt
            fields = ['date_emprunt', 'date_retour_prevue', 'date_retour_effective', 'utilisateur', 'livre', 'id']
            read_only_fields = ['id']
            
class ExemplaireSerializer(serializers.ModelSerializer):
            
        class Meta:
            model = Exemplaire
            fields = ['livre', 'etat', 'code_barres', 'id']
            read_only_fields = ['id']
            
class ReservationSerializer(serializers.ModelSerializer):
            
        class Meta:
            model = Reservation
            fields = ['date_reservation', 'statut', 'utilisateur', 'id']
            read_only_fields = ['id']
