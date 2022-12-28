from django.shortcuts import render
from rest_framework import status, viewsets
from .serializers import CategorySerializer
from .models import Category
import requests
import json
from rest_framework.response import Response
import pymongo

# Create your views here.
class CategoryViewSet(viewsets.ViewSet):

    # Récupération des catégories de Open Food Fact en français.
    def fetchCategories(self, request):
        try:
            # Initialisation de la base de données MongoDB et de la collection "Category".
            client = pymongo.MongoClient("mongodb+srv://open_food_imie:open-food-facts-ms2d@openfoodcluster.nxwyor0.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE&retryWrites=true&w=majority")
            db = client["test"]
            collection = db["categories_category"]

            page = 0 # Page actuellement parcourue.

            while True:
                page += 1 # Incrémentation de la page à parcourir (commence à 1).
                url = f'https://fr.openfoodfacts.org/categories/{page}.json'
                response = requests.get(url)
                data = response.json()

                # On sort de la boucle si la page actuellement parcourue ne contient aucune donnée.
                if data['count'] == 0:
                    break

                # Insertion des catégories dans la base de données.
                collection.insert_many(data['tags'])

            return Response({'msg': 'Les catégories ont correctement été ajoutées dans la base de données.'})
        except:
            return Response({'msg': "Une erreur interne est survenue lors de l'ajout des catégories dans la base de données."})

    