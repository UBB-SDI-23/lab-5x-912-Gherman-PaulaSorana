from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import SwimmerFan
from ..permissions import HasEditPermissionOrReadOnly, IsAdminOrReadOnly
from ..serailizer import SwimmerFanSerializer


class SwimmerFanListCreateView(generics.ListCreateAPIView):
    serializer_class = SwimmerFanSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = SwimmerFan.objects.all()
        print(queryset.explain())
        return queryset


class SwimmerFanInfo(APIView):
    serializer_class = SwimmerFanSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]

    def get(self, request, id):
        try:
            obj = SwimmerFan.objects.get(id=id)

        except SwimmerFan.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = SwimmerFanSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = SwimmerFan.objects.get(id=id)

        except SwimmerFan.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        serializer = SwimmerFanSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = SwimmerFan.objects.get(id=id)

        except SwimmerFan.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        serializer = SwimmerFanSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = SwimmerFan.objects.get(id=id)

        except SwimmerFan.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class SwimmerFanBulk(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        ids = kwargs.get('ids')

        if ids:
            ids_list = ids.split(',')
            queryset = SwimmerFan.objects.filter(id__in=ids_list)
            self.check_object_permissions(request, queryset)
            deleted_count, _ = queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)