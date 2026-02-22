from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Pest
from .serializers import PestSerializer

class PestViewSet(viewsets.ModelViewSet):
    queryset = Pest.objects.all()
    serializer_class = PestSerializer