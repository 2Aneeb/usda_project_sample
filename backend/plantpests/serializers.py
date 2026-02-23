from rest_framework import serializers
from .models import Pest, Category

class CategorySerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'full_name']

    def get_full_name(self, obj):
        return str(obj) # Returns "Diseases > Citrus"

class PestSerializer(serializers.ModelSerializer):
    # This lets Next.js see the category name instead of just a number
    category_display = serializers.CharField(source='category.__str__', read_only=True)

    class Meta:
        model = Pest
        fields = '__all__'