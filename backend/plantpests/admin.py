from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Pest


@admin.register(Pest)
class PestAdmin(admin.ModelAdmin):

    
    #list_display = ('common_name', 'status', 'created_at')
    #list_filter = ('status',)
    #search_fields = ('common_name','pest_type')


    list_display = ('common_name', 'pest_or_disease', 'pest_type', 'status')
    list_filter = ('pest_or_disease', 'status')
    # This groups fields into sections in the "Add" form
    fieldsets = (
        ('Classification', {
            'fields': ('common_name', 'pest_or_disease', 'pest_type', 'status')
        }),
        ('Details', {
            'fields': ('description', 'what_to_look_for', 'how_it_is_treated', 'how_to_prevent')
        }),
    )