from django.contrib import admin
from .models import Utilisateur

class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ('type_utilisateur', 'nom', 'prenom', 'massar', 'cin', 'email', 'telephone', 'historique_emprunts')

admin.site.register(Utilisateur, UtilisateurAdmin)
