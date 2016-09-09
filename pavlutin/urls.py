from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import urlpatterns as static_urlpatterns


urlpatterns = [
    url(r'^admin/', admin.site.urls),
] + static_urlpatterns
