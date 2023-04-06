from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from app1.models import Swimmer, SwimmerFan
from app1.serailizer import SwimmerSerializer, SwimmerSerializerId, SwimmerFanSerializer


class SwimmerDetails(APIView):
    serializer_class = SwimmerSerializer

    def get(self, request):
        obj = Swimmer.objects.all()
        serializer = SwimmerSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SwimmerSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.errors)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


class SwimmersWithAtLeastNYearsExp(APIView):
    serializer_class = SwimmerSerializer

    def get(self, request, yoe):
        years_of_exp = Swimmer.objects.filter(swimmer_years_of_experience__gte=yoe)
        serializer = SwimmerSerializer(years_of_exp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

