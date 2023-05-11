from django.db.models import Avg
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Fan, SwimmerFan
from ..permissions import HasEditPermissionOrReadOnly, IsAdminOrReadOnly
from ..serailizer import FanSerializer, FanSerializerId, SwimmerFanSerializer, FanSerializerAvg


class FanListCreateView(generics.ListCreateAPIView):
    serializer_class = FanSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Fan.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = FanSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class FanInfo(APIView):
    serializer_class = FanSerializerId
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]

    def get(self, request, id):
        try:
            obj = Fan.objects.get(id=id)

        except Fan.DoesNotExist:
            msg = {"msg": "Fan with this id does not exist!"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = FanSerializerId(obj)
        serialized_data = serializer.data

        for swimmer in serialized_data['swimmers']:
            fan_swimmer_serializer = SwimmerFanSerializer(SwimmerFan.objects.get(swimmer=swimmer['id'],
                                                                                 fan=id))
            swimmer['fan_page_name'] = fan_swimmer_serializer.data['fan_page_name']
            swimmer['fan_since_year'] = fan_swimmer_serializer.data['fan_since_year']

            del swimmer['fans']

        return Response(serialized_data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Fan.objects.get(id=id)

        except Fan.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        serializer = FanSerializerId(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Fan.objects.get(id=id)

        except Fan.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        serializer = FanSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Fan.objects.get(id=id)

        except Fan.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, obj)

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class FansOrderedByAvgYoeOfSwimmersTheyAreFansOf(generics.ListCreateAPIView):
    serializer_class = FanSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Fan.objects.filter(swimmers__swimmer_years_of_experience__gte=10,
                                      swimmers__swimmer_years_of_experience__lte=12
                                      ).annotate(
            avg_swimmer_experience=Avg('swimmers__swimmer_years_of_experience')
        ).order_by('-avg_swimmer_experience')

        print(queryset.explain())
        return queryset


class FansOrderedByName(generics.ListCreateAPIView):
    serializer_class = FanSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        f_name = self.kwargs.get("f_name")
        queryset = Fan.objects.all()
        if f_name is not None:
            queryset = queryset.filter(fan_first_name__icontains=f_name)
        print(queryset.explain())
        print(f_name)
        return queryset


class FanBulk(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        ids = kwargs.get('ids')

        if ids:
            ids_list = ids.split(',')
            queryset = Fan.objects.filter(id__in=ids_list)
            self.check_object_permissions(request, queryset)
            deleted_count, _ = queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
