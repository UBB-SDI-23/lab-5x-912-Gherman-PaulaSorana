from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Coach, Team
from ..permissions import HasEditPermissionOrReadOnly, IsAdminOrReadOnly
from ..serailizer import CoachSerializer, CoachSerializerId


class CoachListCreateView(generics.ListCreateAPIView):
    serializer_class = CoachSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Coach.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = CoachSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class CoachInfo(APIView):
    serializer_class = CoachSerializerId
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]

    def get(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Coach.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = CoachSerializerId(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Team.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        serializer = CoachSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Coach.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)
        serializer = CoachSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Coach.objects.get(id=id)

        except Coach.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)
        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class CoachBulk(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        ids = kwargs.get('ids')

        if ids:
            ids_list = ids.split(',')
            queryset = Coach.objects.filter(id__in=ids_list)
            self.check_object_permissions(request, queryset)
            deleted_count, _ = queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)