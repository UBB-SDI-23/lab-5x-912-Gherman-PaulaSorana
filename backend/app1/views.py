# from django.shortcuts import render
# from django.db.models import Avg
# from django.db.models import Count
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status, generics
# from .models import Swimmer, Team, Coach, Fan, SwimmerFan
# from .serailizer import SwimmerSerializer, TeamSerializer, CoachSerializer, FanSerializer, SwimmerFanSerializer, \
#     SwimmerSerializerId, FanSerializerId, CoachSerializerId, FanSerializerAvg, TeamSerializerNo
# # Create your views here.
#
#
# class SwimmerDetails(APIView):
#     serializer_class = SwimmerSerializer
#
#     def get(self, request):
#         obj = Swimmer.objects.all()
#         serializer = SwimmerSerializer(obj, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = SwimmerSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.errors)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class SwimmerInfo(APIView):
#     serializer_class = SwimmerSerializerId
#
#     def get(self, request, id):
#         try:
#             obj = Swimmer.objects.get(id=id)
#
#         except Swimmer.DoesNotExist:
#             msg = {"msg": "Swimmer with this id does not exist!"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerSerializerId(obj)
#         serialized_data = serializer.data
#
#         for fan in serialized_data['fans']:
#             fan_swimmer_serializer = SwimmerFanSerializer(SwimmerFan.objects.get(fan=fan['id'],
#                                                                                  swimmer=id))
#             fan['fan_page_name'] = fan_swimmer_serializer.data['fan_page_name']
#             fan['fan_since_year'] = fan_swimmer_serializer.data['fan_since_year']
#             del fan['swimmers']
#
#         return Response(serialized_data, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         try:
#             obj = Swimmer.objects.get(id=id)
#
#         except Swimmer.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerSerializer(obj, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def patch(self, request, id):
#         try:
#             obj = Swimmer.objects.get(id=id)
#
#         except Swimmer.DoesNotExist:
#             msg = {"msg": "not found error!"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerSerializer(obj, data=request.data, partial=True)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         try:
#             obj = Swimmer.objects.get(id=id)
#
#         except Swimmer.DoesNotExist:
#             msg = {"msg" : "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         obj.delete()
#         return Response({"msg":"deleted"}, status=status.HTTP_204_NO_CONTENT)
#
#
# class TeamDetails(APIView):
#     serializer_class = TeamSerializer
#
#     def get(self, request):
#         obj = Team.objects.all()
#         serializer = TeamSerializer(obj, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = TeamSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.errors)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class TeamInfo(APIView):
#     serializer_class = TeamSerializer
#
#     def get(self, request, id):
#         try:
#             obj = Team.objects.get(id=id)
#             serialized_team = TeamSerializer(obj)
#             serialized_swimmers = SwimmerSerializer(obj.swimmers.all(), many=True)
#
#             serialized_team_data = serialized_team.data
#             serialized_team_data['swimmers'] = serialized_swimmers.data
#
#             for i in range(len(serialized_team_data['swimmers'])):
#                 del serialized_team_data['swimmers'][i]['team']
#
#         except Team.DoesNotExist:
#             msg = {"msg": "Team with this id does not exist!"
#                           ""}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         return Response(serialized_team_data, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         try:
#             obj = Team.objects.get(id=id)
#
#         except Team.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = TeamSerializer(obj, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def patch(self, request, id):
#         try:
#             obj = Team.objects.get(id=id)
#
#         except Team.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = TeamSerializer(obj, data=request.data, partial=True)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         try:
#             obj = Team.objects.get(id=id)
#
#         except Team.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         obj.delete()
#         return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)
#
#
# class CoachDetails(APIView):
#     serializer_class = CoachSerializer
#
#     def get(self, request):
#         obj = Coach.objects.all()
#         serializer = CoachSerializer(obj, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = CoachSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.errors)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class CoachInfo(APIView):
#     serializer_class = CoachSerializerId
#
#     def get(self, request, id):
#         try:
#             obj = Coach.objects.get(id=id)
#
#         except Coach.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = CoachSerializerId(obj)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         try:
#             obj = Coach.objects.get(id=id)
#
#         except Team.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = CoachSerializer(obj, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def patch(self, request, id):
#         try:
#             obj = Coach.objects.get(id=id)
#
#         except Coach.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = CoachSerializer(obj, data=request.data, partial=True)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         try:
#             obj = Coach.objects.get(id=id)
#
#         except Coach.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         obj.delete()
#         return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)
#
#
# class FanDetails(APIView):
#     serializer_class = FanSerializer
#
#     def get(self, request):
#         obj = Fan.objects.all()
#         serializer = FanSerializer(obj, many=True)
#         serialized_data = serializer.data
#
#         for i in range(len(serialized_data)):
#             del serialized_data[i]['swimmers']
#
#         return Response(serialized_data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = FanSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.errors)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class FanInfo(APIView):
#     serializer_class = FanSerializerId
#
#     def get(self, request, id):
#         try:
#             obj = Fan.objects.get(id=id)
#
#         except Fan.DoesNotExist:
#             msg = {"msg": "Fan with this id does not exist!"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = FanSerializerId(obj)
#         serialized_data = serializer.data
#
#         for swimmer in serialized_data['swimmers']:
#             fan_swimmer_serializer = SwimmerFanSerializer(SwimmerFan.objects.get(swimmer=swimmer['id'],
#                                                                                  fan=id))
#             swimmer['fan_page_name'] = fan_swimmer_serializer.data['fan_page_name']
#             swimmer['fan_since_year'] = fan_swimmer_serializer.data['fan_since_year']
#
#         return Response(serialized_data, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         try:
#             obj = Fan.objects.get(id=id)
#
#         except Fan.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = FanSerializerId(obj, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def patch(self, request, id):
#         try:
#             obj = Fan.objects.get(id=id)
#
#         except Fan.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = FanSerializer(obj, data=request.data, partial=True)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         try:
#             obj = Fan.objects.get(id=id)
#
#         except Fan.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         obj.delete()
#         return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)
#
#
# class SwimmerFanDetails(APIView):
#     serializer_class = SwimmerFanSerializer
#
#     def get(self, request):
#         obj = SwimmerFan.objects.all()
#         serializer = SwimmerFanSerializer(obj, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def post(self, request):
#         serializer = SwimmerFanSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.errors)
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# class SwimmerFanInfo(APIView):
#     serializer_class = SwimmerFanSerializer
#
#     def get(self, request, id):
#         try:
#             obj = SwimmerFan.objects.get(id=id)
#
#         except SwimmerFan.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerFanSerializer(obj)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     def put(self, request, id):
#         try:
#             obj = SwimmerFan.objects.get(id=id)
#
#         except SwimmerFan.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerFanSerializer(obj, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def patch(self, request, id):
#         try:
#             obj = SwimmerFan.objects.get(id=id)
#
#         except SwimmerFan.DoesNotExist:
#             msg = {"msg": "not found error"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         serializer = SwimmerFanSerializer(obj, data=request.data, partial=True)
#
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         try:
#             obj = SwimmerFan.objects.get(id=id)
#
#         except SwimmerFan.DoesNotExist:
#             msg = {"msg": "not found"}
#             return Response(msg, status=status.HTTP_404_NOT_FOUND)
#
#         obj.delete()
#         return Response({"msg": "deleted"}, status=status.HTTP_204_NO_CONTENT)
#
#
# class SwimmersWithAtLeastNYearsExp(APIView):
#     serializer_class = SwimmerSerializer
#
#     def get(self, request, yoe):
#         years_of_exp = Swimmer.objects.filter(swimmer_years_of_experience__gte=yoe)
#         serializer = SwimmerSerializer(years_of_exp, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
# class FansOrderedByAvgYoeOfSwimmersTheyAreFansOf(APIView):
#     serializer_class = FanSerializerAvg
#
#     def get(self, request):
#         fans = Fan.objects.annotate(
#             avg_swimmer_experience=Avg('swimmers__swimmer_years_of_experience')
#         ).order_by('-avg_swimmer_experience')
#
#         serializer = FanSerializerAvg(fans, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
# class TeamsOrderedByNoOfSwimmers(APIView):
#     serializer_class = TeamSerializerNo
#
#     def get(self, request):
#         teams = Team.objects.annotate(no_of_swimmers=Count('swimmers')).order_by('no_of_swimmers')
#
#         serializer = TeamSerializerNo(teams, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#
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
#
#
#
#
#
#
#
