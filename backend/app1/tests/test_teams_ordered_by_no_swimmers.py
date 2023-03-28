from rest_framework.test import APITestCase
from app1.models import Swimmer, Team


class TeamsOrderedByNoOfSwimmers(APITestCase):
    @classmethod
    def setUpTestData(cls):

        Team.objects.create(team_name='t1', team_founding_year=2000, team_budget=1000, team_motto='bhd',
                            team_abbreviation='T1')
        Team.objects.create(team_name='t2', team_founding_year=2000, team_budget=1000, team_motto='bhd',
                            team_abbreviation='T2')
        Team.objects.create(team_name='t3', team_founding_year=2000, team_budget=1000, team_motto='bhd',
                            team_abbreviation='T3')

        Swimmer.objects.create(swimmer_last_name='S1', swimmer_first_name='s1',
                               swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                               swimmer_years_of_experience=5, team_id=1)
        Swimmer.objects.create(swimmer_last_name='S2', swimmer_first_name='s2',
                               swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                               swimmer_years_of_experience=10, team_id=1)
        Swimmer.objects.create(swimmer_last_name='S3', swimmer_first_name='s3',
                               swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                               swimmer_years_of_experience=15, team_id=1)
        Swimmer.objects.create(swimmer_last_name='S4', swimmer_first_name='s4',
                               swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                               swimmer_years_of_experience=15, team_id=3)

    def test_teams_ordered_by_no_swimmers(self):
        response = self.client.get("/app1/teamNoSwim/")

        self.assertEqual(str(response.data[0]['no_of_swimmers']), '0')
        self.assertEqual(str(response.data[1]['no_of_swimmers']), '1')
        self.assertEqual(str(response.data[2]['no_of_swimmers']), '3')
