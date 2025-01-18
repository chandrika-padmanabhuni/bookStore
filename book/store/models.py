from django.db import models

# Create your models here.

class Book(models.Model):
    coverpage=models.ImageField(null=True, blank=True)
    authorname = models.CharField(max_length=200)
    price = models.IntegerField(null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    total_pages= models.IntegerField(null=True, blank=True)
    phone_no= models.IntegerField(null=True, blank=True)
    email= models.CharField(max_length=200)
    adress=models.CharField(max_length=200)
    
def __str__(self):
       return self.authorname