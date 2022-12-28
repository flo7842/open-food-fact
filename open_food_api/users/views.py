from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token

# Create your views here.
from .utils import get_tokens_for_user
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User

import re

def test_password(password):
    regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$"
    pattern = re.compile(regex)
    match = re.match(pattern, password)

    if match:
        return True
    else:
        return False

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        wrongData = "Les informations saisies sont incorrectes."

        try:
            if 'email' not in request.data or 'password' not in request.data:
                raise Exception(wrongData)

            email = request.data['email']
            password = request.data["password"]
            # Looking for an existing account with the given email address before serialization to prevent exception since the email should be unique in the DB.
            if User.objects.filter(email=email):
                raise Exception('Adresse mail déjà utilisée.')

            if test_password(password) == False:
                raise Exception('Le mot de passe doit contenir au moins : 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum')

            user = {
                'email': email,
                'password': make_password(password)
            }

            serializer = UserSerializer(data=user)

            if serializer.is_valid():
                serializer.save()
                return Response({'msg': "L'utilisateur a correctement été créé."}, status=status.HTTP_200_OK)

            return Response({'msg': wrongData}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as error:
            return Response({'msg': f'{error}'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        try:
            badCredentials = 'Identifiant ou mot de passe incorrect.'

            if 'email' not in request.data or 'password' not in request.data:
                raise Exception(badCredentials)

            email = request.data['email']
            password = request.data['password']

            try:
                user = User.objects.get(email=email)
            except:
                raise Exception(badCredentials)

            check = check_password(password, user.password)
        
            if check == False:
                raise Exception(badCredentials)

            auth_data = get_tokens_for_user(request.user)
            return Response({'msg': 'Authentification réussie !', **auth_data}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'msg': f'{error}'}, status=status.HTTP_401_UNAUTHORIZED)
            

class LogifefenView(APIView):
    def post(self, request):
        email=request.data["email"]
        password=request.data["password"]
        user=User.objects.get(email=email)
        self.object = self.get_object()
        if user is None:
            return Response({"response":"No User exist"})
        if not self.object.check_password(password):
            return Response({"response":"incorrect Password"})
        return Response({"data":"done"})