from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

admin.site.site_header = "Baku Electronics"
admin.site.site_title = "Baku Electronics"
admin.site.index_title = "Ana səhifə"


def health(_request):
    return JsonResponse({"ok": True})


urlpatterns = [
    path("health/", health),
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("api/", include("home.urls")),
]
