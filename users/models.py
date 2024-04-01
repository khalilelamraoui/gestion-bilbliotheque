from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):

    cin = models.CharField(max_length=20, blank=True, null=True)
    massar = models.CharField(max_length=20, blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    historique_emprunts = models.TextField(blank=True, null=True)
    TYPE_UTILISATEUR_CHOICES = [
        ('bibliothecaire', 'Bibliothécaire'),
        ('lecteur', 'Lecteur'),
    ]
    type_utilisateur = models.CharField(max_length=20, choices=TYPE_UTILISATEUR_CHOICES, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'auth_user'
    
    
    
    def __str__(self):
        return self.username