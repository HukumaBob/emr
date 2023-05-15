from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('patients.urls', namespace='patients')),
]
# handler404 = 'core.views.page_not_found'
# handler500 = 'core.views.server_error'
# handler403 = 'core.views.permission_denied'

# urlpatterns = [
#     path('', include('posts.urls', namespace='posts')),
#     path('admin/', admin.site.urls),
#     path('auth/', include('users.urls')),
#     path('auth/', include('django.contrib.auth.urls')),
#     path('about/', include('about.urls', namespace='about')),
#     path('api-auth/', include('rest_framework.urls')),
# ]
#
# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns += static(
#         settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
#     )
#     urlpatterns += (path('__debug__/', include(debug_toolbar.urls)),)