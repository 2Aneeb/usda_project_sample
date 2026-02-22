from django.db import models

# Create your models here.
from django.db import models

class Pest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('ACTIVE', 'Active/Published'),
        ('REMOVAL_REQUESTED', 'Removal Requested'),
    ]

    common_name = models.CharField(max_length=200)
    pest_or_disease = models.CharField(max_length=22)
    pest_type = models.CharField(max_length=22, blank=True)
    description = models.TextField()
    what_to_look_for = models.TextField(blank=True)
    how_it_is_treated = models.TextField(blank=True)
    how_to_prevent = models.TextField(blank=True)
    
    # Workflow field
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='PENDING'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.common_name} ({self.status})"