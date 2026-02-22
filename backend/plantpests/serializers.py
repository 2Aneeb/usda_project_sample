from rest_framework import serializers
from .models import Pest

class PestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pest
        fields = '__all__' # This shares all columns (common_name, status, etc.)