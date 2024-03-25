# Generated by Django 5.0.3 on 2024-03-25 09:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_book_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('libelle', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('libelle', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Livre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('auteurs', models.CharField(max_length=255)),
                ('editeur', models.CharField(max_length=255)),
                ('date_publication', models.DateField()),
                ('isbn', models.CharField(max_length=13)),
                ('genre', models.CharField(max_length=255)),
                ('langue', models.CharField(max_length=2)),
                ('resume', models.TextField(blank=True, null=True)),
                ('disponibilite', models.CharField(max_length=20)),
                ('emplacement', models.CharField(blank=True, max_length=255, null=True)),
                ('image_couverture', models.ImageField(blank=True, null=True, upload_to='book_covers')),
            ],
        ),
        migrations.CreateModel(
            name='Utilisateur',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('telephone', models.CharField(max_length=20)),
                ('type_utilisateur', models.CharField(choices=[('administrateur', 'Administrateur'), ('bibliothecaire', 'Bibliothécaire'), ('lecteur', 'Lecteur')], max_length=20)),
                ('mot_de_passe', models.CharField(max_length=255)),
                ('date_inscription', models.DateField()),
                ('historique_emprunts', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='book',
            name='quantity',
            field=models.IntegerField(),
        ),
        migrations.CreateModel(
            name='Exemplaire',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etat', models.CharField(choices=[('neuf', 'Neuf'), ('abime', 'Abîmé')], max_length=20)),
                ('code_barres', models.CharField(max_length=255)),
                ('livre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.livre')),
            ],
        ),
        migrations.CreateModel(
            name='LivreCategorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categorie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.categorie')),
                ('livre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.livre')),
            ],
        ),
        migrations.CreateModel(
            name='LivreGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.genre')),
                ('livre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.livre')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_reservation', models.DateField()),
                ('statut', models.CharField(choices=[('en_attente', 'En attente'), ('validee', 'Validée'), ('annulee', 'Annulée')], max_length=20)),
                ('livre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.livre')),
                ('utilisateur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.utilisateur')),
            ],
        ),
        migrations.CreateModel(
            name='Emprunt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_emprunt', models.DateField()),
                ('date_retour_prevue', models.DateField()),
                ('date_retour_effective', models.DateField(blank=True, null=True)),
                ('livre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.livre')),
                ('utilisateur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.utilisateur')),
            ],
        ),
    ]
