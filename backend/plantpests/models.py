from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories'
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} > {self.name}"
        return self.name

class Pest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('ACTIVE', 'Active/Published'),
        ('REMOVAL_REQUESTED', 'Removal Requested'),
    ]

    common_name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='pests')
    
    # Details from USDA
    description = models.TextField()
    what_to_look_for = models.TextField(blank=True)
    how_to_prevent = models.TextField(blank=True)
    how_it_is_treated = models.TextField(blank=True)
    
    # Visuals & Metadata
    image_url = models.URLField(max_length=500, blank=True, help_text="Link to an image online")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    removal_reason = models.TextField(blank=True, help_text="Reason for deletion request")
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # This changes the text in the Admin list
        verbose_name = "Pest or Disease"
        verbose_name_plural = "Pests and Diseases"

    def __str__(self):
        return self.common_name