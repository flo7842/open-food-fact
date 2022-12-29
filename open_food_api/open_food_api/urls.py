from django.urls import include, path

urlpatterns = [
    path('api/', include('users.urls')),
    path('api/', include('categories.urls')),
]