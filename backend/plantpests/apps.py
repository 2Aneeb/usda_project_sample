from django.apps import AppConfig

class PlantpestsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'plantpests'
    # Add this line to change the sidebar heading:
    verbose_name = "Plant Pests and Diseases"