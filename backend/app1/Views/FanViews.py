from django.db.models import Avg
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from ..models import Fan, SwimmerFan
from ..serailizer import FanSerializer, FanSerializerId, SwimmerFanSerializer, FanSerializerAvg


class FanDetails(APIView):
    serializer_class = FanSerializer

    def get(self, request):
        obj = Fan.objects.all()
        serializer = FanSerializer(obj, many=True)
        serialized_data = serializer.data

        for i in range(len(serialized_data)):
            del serialized_data[i]['swimmers']

        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FanSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.errors)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FanInfo(APIView):
    serializer_class = FanSerializerId

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

        return Response(serialized_data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Fan.objects.get(id=id)

        except Fan.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

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

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class FansOrderedByAvgYoeOfSwimmersTheyAreFansOf(APIView):
    serializer_class = FanSerializerAvg

    def get(self, request):
        fans = Fan.objects.annotate(
            avg_swimmer_experience=Avg('swimmers__swimmer_years_of_experience')
        ).order_by('-avg_swimmer_experience')

        serializer = FanSerializerAvg(fans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)