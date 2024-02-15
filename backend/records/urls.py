from django.urls import include, path
from rest_framework import routers

from records.views import RecordViewSet

app_name = 'records'

router_v1 = routers.DefaultRouter()

router_v1.register('records', RecordViewSet, basename='records')

urlpatterns = [
    path('', include(router_v1.urls)),
]
