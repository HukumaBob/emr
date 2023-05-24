from django.urls import path
from .views import patient_list, add_patient, PatientView

app_name = 'patients'

urlpatterns = [
    path('', patient_list, name='patient_list'),
    path('patients/list/', PatientView.as_view()),
    path('patients/', patient_list, name='patient_list'),
    path('patients/add/', add_patient, name='add_patient'),
]

