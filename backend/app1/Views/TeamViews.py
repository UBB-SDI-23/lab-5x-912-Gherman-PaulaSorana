from django.db.models import Count
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from .Pagination import CustomPagination
from ..models import Team, Swimmer
from ..permissions import HasEditPermissionOrReadOnly, IsAdminOrReadOnly
from ..serailizer import TeamSerializer, TeamSerializerNo, SwimmerSerializer


class TeamListCreateView(generics.ListCreateAPIView):
    serializer_class = TeamSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # queryset = Team.objects.all()
        queryset = Team.objects.all().annotate(no_swim=Count('swimmers'))
        # print(queryset.explain())
        return queryset

    def post(self, request, *args, **kwargs):
        print(request.user)
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = TeamSerializer(data=data, depth=0)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class TeamInfo(APIView):
    serializer_class = TeamSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]

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

        self.check_object_permissions(request, obj)

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

        self.check_object_permissions(request, obj)

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

        self.check_object_permissions(request, obj)

        obj.delete()
        return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)


class TeamsOrderedByNoOfSwimmers(generics.ListCreateAPIView):
    serializer_class = TeamSerializerNo
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Team.objects.annotate(no_of_swimmers=Count('swimmers')).order_by('no_of_swimmers')
        print(queryset.explain())
        return queryset


# class TeamsBulk(APIView):
# 
#     def post(self, request, id):
#         try:
#             team = Team.objects.get(id=id)
# 
#         except Team.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
# 
#         swimmers = request.data
# 
#         for swimmer_data in swimmers:
#             try:
#                 swimmer = Swimmer.objects.get(id=swimmer_data['swimmer_id'])
#             except Swimmer.DoesNotExist:
#                 msg = {"msg": "Swimmer with this id does not exist!"}
#                 return Response(msg, status=status.HTTP_404_NOT_FOUND)
#             swimmer.team = team
#             swimmer.save()
# 
#         return Response({"message": "Bulk succeed"}, status=status.HTTP_200_OK)


class TeamsOrderedByName(generics.ListCreateAPIView):
    serializer_class = TeamSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        t_name = self.kwargs.get("t_name")
        queryset = Team.objects.all()
        if t_name is not None:
            queryset = queryset.filter(team_name__icontains=t_name)
        print(queryset.explain())
        print(t_name)
        return queryset


class TeamBulk(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        ids = kwargs.get('ids')

        if ids:
            ids_list = ids.split(',')
            queryset = Team.objects.filter(id__in=ids_list)
            self.check_object_permissions(request, queryset)
            deleted_count, _ = queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


