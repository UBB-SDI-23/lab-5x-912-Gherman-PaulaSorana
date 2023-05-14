from django.db.models import Count
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from app1.Views.Pagination import CustomPagination
from app1.models import UserProfile
from app1.permissions import IsAdminOrReadOnly, HasEditPermissionOrReadOnly
from app1.serailizer import UserProfileDetailSerializer, UserDetailsSerializer, UserProfileSerializer
import rest_framework.views as RestViews
from rest_framework import status
import rest_framework.response as RestReponses
from rest_framework.views import APIView
from rest_framework.response import Response


class UserList(generics.ListAPIView):
    queryset = UserProfile.objects.all().order_by("id")
    serializer_class = UserDetailsSerializer
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


class UserBulk(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        ids = kwargs.get('ids')

        if ids:
            ids_list = ids.split(',')
            queryset = UserProfile.objects.filter(id__in=ids_list)
            self.check_object_permissions(request, queryset)
            deleted_count, _ = queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdateUserPageSizeView(RestViews.APIView):
    permission_classes = [HasEditPermissionOrReadOnly]

    def put(self, request, id):

        try:
            user = UserProfile.objects.get(id=id)
        except UserProfile.DoesNotExist:
            message = {"msg": f"{UserProfile.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, user)

        user.page_size = request.data['page_size']
        user.save()
        return RestReponses.Response({"message": "User page size updated"}, status=status.HTTP_200_OK)

