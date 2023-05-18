from django.urls import include, path
from .views import PatientViewSet
from rest_framework.routers import DefaultRouter

router_v1 = DefaultRouter()
router_v1.register(r'patient', PatientViewSet, basename='patient')

urlpatterns = [
    path('', include(router_v1.urls))
    ]
