from django.urls import path
from contracts import views

urlpatterns = [
    path('contracts', views.getContractListView, name='contract-list'),
    path('contractDetail/<int:id>', views.getContractDetailView, name='contract-detail'),
    path('contracts/upload', views.setContractUpload, name='contract-upload'),
]
