from django.db.models import Count
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Team, Swimmer
from ..serailizer import TeamSerializer, TeamSerializerNo, SwimmerSerializer


class TeamDetails(APIView):
    serializer_class = TeamSerializer
    pagination_class = CustomPagination

    def get(self, request):
        obj = Team.objects.all()
        serializer = TeamSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.errors)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamInfo(APIView):
    serializer_class = TeamSerializer
    pagination_class = CustomPagination

    def get(self, request, id):
        try:
            obj = Team.objects.get(id=id)
            serialized_team = TeamSerializer(obj)
            serialized_swimmers = SwimmerSerializer(obj.swimmers.all(), many=True)

            serialized_team_data = serialized_team.data
            serialized_team_data['swimmers'] = serialized_swimmers.data

            for i in range(len(serialized_team_data['swimmers'])):
                del serialized_team_data['swimmers'][i]['team']

        except Team.DoesNotExist:
            msg = {"msg": "Team with this id does not exist!"
                          ""}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        return Response(serialized_team_data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = Team.objects.get(id=id)

        except Team.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TeamSerializer(obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            obj = Team.objects.get(id=id)

        except Team.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serializer = TeamSerializer(obj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = Team.objects.get(id=id)

        except Team.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class TeamsOrderedByNoOfSwimmers(APIView):
    serializer_class = TeamSerializerNo

    def get(self, request):
        teams = Team.objects.annotate(no_of_swimmers=Count('swimmers')).order_by('no_of_swimmers')

        serializer = TeamSerializerNo(teams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TeamsBulk(APIView):

    def post(self, request, id):
        try:
            team = Team.objects.get(id=id)

        except Team.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        swimmers = request.data

        for swimmer_data in swimmers:
            try:
                swimmer = Swimmer.objects.get(id=swimmer_data['swimmer_id'])
            except Swimmer.DoesNotExist:
                msg = {"msg": "Swimmer with this id does not exist!"}
                return Response(msg, status=status.HTTP_404_NOT_FOUND)
            swimmer.team = team
            swimmer.save()

        return Response({"message": "Bulk succeed"}, status=status.HTTP_200_OK)



