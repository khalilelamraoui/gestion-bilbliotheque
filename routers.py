
from rest_framework import routers

from app.viewsets import MenuViewSet

router = routers.SimpleRouter()

router.register(r'menu', MenuViewSet, basename="menu")

urlpatterns = router.urls