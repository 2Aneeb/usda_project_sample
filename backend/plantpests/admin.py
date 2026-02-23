from django.contrib import admin
from .models import Pest, Category

# This renames the header in the Admin interface
admin.site.site_header = "USDA Plant Pests and Diseases Portal"
admin.site.index_title = "Management Dashboard"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)

@admin.register(Pest)
class PestAndDiseaseAdmin(admin.ModelAdmin): # Renamed class for clarity
    list_display = ('common_name', 'category', 'status')
    list_filter = ('category', 'status')
    
    fieldsets = (
        ('Classification', {
            'fields': ('common_name', 'category', 'status', 'image_url')
        }),
        ('Details', {
            'fields': ('description', 'what_to_look_for', 'how_to_prevent', 'how_it_is_treated')
        }),
        ('Requests', {
            'fields': ('removal_reason',),
            'classes': ('collapse',), # Hides this section by default
        }),
    )