from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('type_utilisateur', 'is_superuser', 'massar', 'email', 'username', 'cin', 'telephone', 'historique_emprunts')
    fieldsets = (
        (None, {'fields': ('massar', 'type_utilisateur', 'email', 'username', 'cin', 'telephone', 'historique_emprunts')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('massar', 'type_utilisateur', 'email', 'username', 'cin', 'telephone', 'historique_emprunts', 'password1', 'password2'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)