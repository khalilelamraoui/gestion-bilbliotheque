from django.db import models

# Create your models here.
class Book(models.Model):
   name = models.CharField(max_length=255)
   quantity = models.IntegerField()
   created = models.DateTimeField(auto_now_add=True)
   updated = models.DateTimeField(auto_now=True)


class Livre(models.Model):
    titre = models.CharField(max_length=255)
    auteurs = models.CharField(max_length=255)
    editeur = models.CharField(max_length=255)
    date_publication = models.DateField()
    isbn = models.CharField(max_length=13)
    genre = models.CharField(max_length=255)
    langue = models.CharField(max_length=2)
    resume = models.TextField(null=True, blank=True)
    disponibilite = models.CharField(max_length=20)
    emplacement = models.CharField(max_length=255, null=True, blank=True)
    image_couverture = models.ImageField(upload_to='frontend/public/books/', null=True, blank=True)

class Utilisateur(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20)
    TYPE_UTILISATEUR_CHOICES = [
        ('administrateur', 'Administrateur'),
        ('bibliothecaire', 'Bibliothécaire'),
        ('lecteur', 'Lecteur'),
    ]
    type_utilisateur = models.CharField(max_length=20, choices=TYPE_UTILISATEUR_CHOICES)
    mot_de_passe = models.CharField(max_length=255)
    date_inscription = models.DateField()
    historique_emprunts = models.TextField(null=True, blank=True)

class Emprunt(models.Model):
    date_emprunt = models.DateField()
    date_retour_prevue = models.DateField()
    date_retour_effective = models.DateField(null=True, blank=True)
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)

class Exemplaire(models.Model):
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)
    ETAT_CHOICES = [
        ('neuf', 'Neuf'),
        ('abime', 'Abîmé'),
    ]
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES)
    code_barres = models.CharField(max_length=255)

class Reservation(models.Model):
    date_reservation = models.DateField()
    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('validee', 'Validée'),
        ('annulee', 'Annulée'),
    ]
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES)
    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)

class Categorie(models.Model):
    libelle = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

class Genre(models.Model):
    libelle = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)

class LivreCategorie(models.Model):
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)

class LivreGenre(models.Model):
    livre = models.ForeignKey(Livre, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
