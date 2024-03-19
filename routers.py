
from rest_framework import routers

from app.viewsets import BookViewSet

router = routers.SimpleRouter()

router.register(r'book', BookViewSet, basename="book")

urlpatterns = router.urls