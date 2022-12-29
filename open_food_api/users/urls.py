from django.urls import path
from . import views

urlpatterns=[
    path('login', views.UserViewSet.as_view({'post': 'login'}), name='login'),
    path('register', views.UserViewSet.as_view({'post': 'register'}), name='register'),
    path('user/products', views.UserViewSet.as_view({'get': 'fetchProducts', 'post': 'saveProduct'}), name='user-products'),
]