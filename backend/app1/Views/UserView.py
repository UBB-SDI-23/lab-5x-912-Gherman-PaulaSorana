from django.db.models import Count
from rest_framework import generics

from app1.models import UserProfile
from app1.serailizer import UserProfileDetailSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all().annotate(
        teams_count=Count("user__team", distinct=True),
        swimmers_count=Count("user__swimmer", distinct=True),
        coaches_count=Count("user__coach", distinct=True),
        fans_count=Count("user__fan", distinct=True),
    )
    serializer_class = UserProfileDetailSerializer
    lookup_field = "user_id"
