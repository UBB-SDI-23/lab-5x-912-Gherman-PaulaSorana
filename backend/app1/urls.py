from django.urls import path
from .Views.SwimmerViews import SwimmerListCreateView, SwimmerInfo, SwimmersWithAtLeastNYearsExp
from .Views.TeamViews import TeamListCreateView, TeamInfo, TeamsBulk, TeamsOrderedByNoOfSwimmers, TeamsOrderedByName
from .Views.CoachViews import CoachInfo, CoachListCreateView
from .Views.FanViews import FanInfo, FanListCreateView, FansOrderedByAvgYoeOfSwimmersTheyAreFansOf
from .Views.SwimmerFanViews import SwimmerFanListCreateView, SwimmerFanInfo

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
    path("teamBulk/<int:id>/", TeamsBulk.as_view()),
    path("teamOrdName/<int:t_name>/", TeamsOrderedByName.as_view(), name="t_name")
]
