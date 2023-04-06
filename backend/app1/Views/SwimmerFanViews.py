from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from app1.models import SwimmerFan
from app1.serailizer import SwimmerFanSerializer


class SwimmerFanDetails(APIView):
    serializer_class = SwimmerFanSerializer

    def get(self, request):
        obj = SwimmerFan.objects.all()
        serializer = SwimmerFanSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SwimmerFanSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.errors)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SwimmerFanInfo(APIView):
    serializer_class = SwimmerFanSerializer

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

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)
