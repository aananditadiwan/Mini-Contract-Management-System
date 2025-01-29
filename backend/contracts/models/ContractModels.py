from django.db import models


class ContractModel(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Finalized', 'Finalized'),
    ]
    id = models.AutoField(primary_key=True)
    client_name = models.CharField(max_length=255,blank=True, null=True)
    contract_id = models.CharField(max_length=50, unique=True)
    contract_data = models.JSONField()  # Stores JSON data
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft',blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta :
        db_table = 'contract'
    def __str__(self):
        return self.contract_id
