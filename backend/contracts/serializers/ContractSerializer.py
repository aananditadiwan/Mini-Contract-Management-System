from rest_framework import serializers
from contracts.models.ContractModels import ContractModel

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractModel
        fields = '__all__'