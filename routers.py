
from rest_framework import routers

from app.viewsets import BookViewSet, LivreViewSet, UtilisateurViewSet, EmpruntViewSet, ExemplaireViewSet, ReservationViewSet
from users.viewsets import CustomUserViewSet

router = routers.SimpleRouter()

router.register(r'book', BookViewSet, basename="book")
router.register(r'livre', LivreViewSet, basename="livre")
router.register(r'utilisateur', UtilisateurViewSet, basename="utilisateur")
router.register(r'emprunt', EmpruntViewSet, basename="emprunt")
router.register(r'exemplaire', ExemplaireViewSet, basename="exemplaire")
router.register(r'reservation', ReservationViewSet, basename="reservation")

router.register(r'customuser', CustomUserViewSet, basename="customuser")

urlpatterns = router.urls
