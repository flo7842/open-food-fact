from django.urls import path
from . import views

urlpatterns=[
    path('categories/', views.CategoryViewSet.as_view({'get': 'fetchCategories'}), name='fetchCategories'),
]