from django.urls import path

from .Views.LoginView import LoginView
from .Views.RegisterView import UserRegistrationView, UserActivationView
from .Views.SwimmerViews import SwimmerListCreateView, SwimmerInfo, SwimmersWithAtLeastNYearsExp, SwimmersOrderedByName, \
    SwimmerBulk
from .Views.TeamViews import TeamListCreateView, TeamInfo, TeamsOrderedByNoOfSwimmers, TeamsOrderedByName, TeamBulk
from .Views.CoachViews import CoachInfo, CoachListCreateView, CoachBulk
from .Views.FanViews import FanInfo, FanListCreateView, FansOrderedByAvgYoeOfSwimmersTheyAreFansOf, FansOrderedByName, \
    FanBulk
from .Views.SwimmerFanViews import SwimmerFanListCreateView, SwimmerFanInfo, SwimmerFanBulk
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .Views.UserView import UserDetail, UserList, UpdateUserRoleView, UserBulk

urlpatterns = [

    path("swimmer/", SwimmerListCreateView.as_view(), name="swimmer"),
    path("swimmer/<int:id>/", SwimmerInfo.as_view()),
    path("team/", TeamListCreateView.as_view(), name="team"),
    path("team/<int:id>/", TeamInfo.as_view()),
    path("coach/", CoachListCreateView.as_view(), name="coach"),
    path("coach/<int:id>/", CoachInfo.as_view()),
    path("fan/", FanListCreateView.as_view(), name="fan"),
    path("fan/<int:id>/", FanInfo.as_view()),
    path("swimmerFan/", SwimmerFanListCreateView.as_view(), name="swimmerFan"),
    path("swimmerFan/<int:id>/", SwimmerFanInfo.as_view()),
    path("yoe/<int:yoe>/", SwimmersWithAtLeastNYearsExp.as_view(), name="yoe"),
    path("fanAvgYoe/", FansOrderedByAvgYoeOfSwimmersTheyAreFansOf.as_view(), name="fanAvgYoe"),
    path("teamNoSwim/", TeamsOrderedByNoOfSwimmers.as_view(), name="teamNoSwim"),
    # path("teamBulk/<int:id>/", TeamsBulk.as_view()),
    path("teamOrdName/<str:t_name>/", TeamsOrderedByName.as_view(), name="t_name"),
    path("swimmerOrdName/<str:s_name>/", SwimmersOrderedByName.as_view(), name="s_name"),
    path("fanOrdName/<str:f_name>/", FansOrderedByName.as_view(), name="f_name"),
    path("login/", LoginView.as_view(), name="token_obtain_pair"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("activate/", UserActivationView.as_view(), name="activate-user"),
    path("profile/<str:id>/", UserDetail.as_view(), name="profile"),
    path("users/", UserList.as_view()),
    path("update-role/<str:id>/", UpdateUserRoleView.as_view()),
    path('userBulk/<str:ids>/', UserBulk.as_view(), name='user_bulk'),
    path('teamBulk/<str:ids>/', TeamBulk.as_view(), name='team_bulk'),
    path('swimmerBulk/<str:ids>/', SwimmerBulk().as_view(), name='swimmer_bulk'),
    path('swimmerfanBulk/<str:ids>/', SwimmerFanBulk().as_view(), name='swimmer_bulk'),
    path('fanBulk/<str:ids>/', FanBulk().as_view(), name='fan_bulk'),
    path('coachBulk/<str:ids>/', CoachBulk().as_view(), name='fan_bulk'),
]
