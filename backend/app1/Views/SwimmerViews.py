from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Swimmer, SwimmerFan
from ..serailizer import SwimmerSerializer, SwimmerSerializerId, SwimmerFanSerializer


class SwimmerListCreateView(generics.ListCreateAPIView):
    serializer_class = SwimmerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Swimmer.objects.all()
        print(queryset.explain())
        return queryset


class SwimmerInfo(APIView):
    serializer_class = SwimmerSerializerId

    def get(self, request, id):
        try:
            obj = Swimmer.objects.get(id=id)

        except Swimmer.DoesNotExist:
            msg = {"msg": "Swimmer with this id does not exist!"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = SwimmerSerializerId(obj)
        serialized_data = serializer.data

        for fan in serialized_data['fans']:
            fan_swimmer_serializer = SwimmerFanSerializer(SwimmerFan.objects.get(fan=fan['id'],
                                                                                 swimmer=id))
            fan['fan_page_name'] = fan_swimmer_serializer.data['fan_page_name']
            fan['fan_since_year'] = fan_swimmer_serializer.data['fan_since_year']
            del fan['swimmers']

        return Response(serialized_data, status=status.HTTP_200_OK)


    def put(self, request, id):
        try:
            obj = Swimmer.objects.get(id=id)

        except Swimmer.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = SwimmerSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Swimmer.objects.get(id=id)

        except Swimmer.DoesNotExist:
            msg = {"msg": "not found error!"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = SwimmerSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Swimmer.objects.get(id=id)

        except Swimmer.DoesNotExist:
            msg = {"msg" : "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"deleted"}, status=status.HTTP_204_NO_CONTENT)


class SwimmersWithAtLeastNYearsExp(generics.ListCreateAPIView):
    serializer_class = SwimmerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        min_yoe = self.kwargs.get("yoe")
        queryset = Swimmer.objects.all()
        if min_yoe is not None:
            queryset = queryset.filter(swimmer_years_of_experience__gte=min_yoe)
        print(queryset.explain())
        print(min_yoe)
        return queryset


class SwimmersOrderedByName(generics.ListCreateAPIView):
    serializer_class = SwimmerSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        s_name = self.kwargs.get("s_name")
        queryset = Swimmer.objects.all()
        if s_name is not None:
            queryset = queryset.filter(swimmer_first_name__icontains=s_name)
        print(queryset.explain())
        print(s_name)
        return queryset

