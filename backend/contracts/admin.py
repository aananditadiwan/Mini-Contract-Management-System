from django.contrib import admin

# Register your models here.
from .models.ContractModels import ContractModel

admin.site.register(ContractModel)
