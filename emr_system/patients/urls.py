from django.urls import path
from .views import patient_list, add_patient

app_name = 'patients'

urlpatterns = [
    path('', patient_list, name='patient_list'),
    path('patients/', patient_list, name='patient_list'),
    path('patients/add/', add_patient, name='add_patient'),
]

