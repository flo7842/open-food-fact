from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Category
import requests
import pymongo

# Create your views here.
class CategoryViewSet(viewsets.ViewSet):

    # Récupération des catégories depuis Open Food Fact en français.
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

                # Insertion des catégories en masse dans la base de données.
                collection.insert_many(data['tags'])

            return Response({'msg': 'Les catégories ont correctement été ajoutées dans la base de données.'}, status=status.HTTP_200_OK)
        except:
            return Response({'msg': "Une erreur interne est survenue lors de l'ajout des catégories dans la base de données."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Récupération des catégories dans la base de données.
    def list(self, request):
        try:
            categories = Category.objects.all()
            categList = []

            for category in categories:
                # Parse les données récupérées au format JSON
                categ = {
                    'name': category.name,
                    'url': category.url,
                    'products': category.products
                }

                categList.append(categ)

            return Response(categList, status=status.HTTP_200_OK)
        except:
            return Response({'msg': "Une erreur interne est survenue lors de la récupération des catégories."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    