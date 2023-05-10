from django.db.models import Count
from rest_framework import generics

from app1.Views.Pagination import CustomPagination
from app1.models import UserProfile
from app1.permissions import IsAdminOrReadOnly
from app1.serailizer import UserProfileDetailSerializer, UsernameAndRoleSerializer, UserProfileSerializer
import rest_framework.views as RestViews
from rest_framework import status
import rest_framework.response as RestReponses


class UserList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UsernameAndRoleSerializer
    pagination_class = CustomPagination


class UserDetail(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all().annotate(
        teams_count=Count("user__team", distinct=True),
        swimmers_count=Count("user__swimmer", distinct=True),
        coaches_count=Count("user__coach", distinct=True),
        fans_count=Count("user__fan", distinct=True),
    )
    serializer_class = UserProfileDetailSerializer
    lookup_field = "id"


class UpdateUserRoleView(RestViews.APIView):
    permission_classes = [IsAdminOrReadOnly]

    def put(self, request, id):
        self.check_permissions(request)

        try:
            user = UserProfile.objects.get(id=id)
        except UserProfile.DoesNotExist:
            message = {"msg": f"{UserProfile.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status=status.HTTP_404_NOT_FOUND)

        user.role = request.data['role']
        user.save()
        return RestReponses.Response({"message": "User role updated"}, status=status.HTTP_200_OK)


