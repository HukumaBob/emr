from django.urls import include, path
from rest_framework import routers

from records.views import (
    RecordViewSet,
    SchemaViewSet,
    RecordTemplateViewSet
    )

app_name = 'records'

router_v1 = routers.DefaultRouter()

router_v1.register('records', RecordViewSet, basename='records')
router_v1.register('templates', RecordTemplateViewSet, basename='templates')
router_v1.register('schemas', SchemaViewSet, basename='schemas')

urlpatterns = [
    path('', include(router_v1.urls)),
]
