from django.urls import path

from .views import HomeView, SubscribeView

urlpatterns = [
    path("home/", HomeView.as_view()),
    path("subscribe/", SubscribeView.as_view()),
]
