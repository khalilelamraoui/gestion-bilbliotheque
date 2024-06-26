# Generated by Django 5.0.3 on 2024-04-03 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rename_name_book_auteurs_remove_book_created_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='auteurs',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='book',
            name='date_publication',
        ),
        migrations.RemoveField(
            model_name='book',
            name='disponibilite',
        ),
        migrations.RemoveField(
            model_name='book',
            name='editeur',
        ),
        migrations.RemoveField(
            model_name='book',
            name='emplacement',
        ),
        migrations.RemoveField(
            model_name='book',
            name='genre',
        ),
        migrations.RemoveField(
            model_name='book',
            name='image_couverture',
        ),
        migrations.RemoveField(
            model_name='book',
            name='isbn',
        ),
        migrations.RemoveField(
            model_name='book',
            name='langue',
        ),
        migrations.RemoveField(
            model_name='book',
            name='resume',
        ),
        migrations.RemoveField(
            model_name='book',
            name='titre',
        ),
        migrations.AddField(
            model_name='book',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='quantity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
