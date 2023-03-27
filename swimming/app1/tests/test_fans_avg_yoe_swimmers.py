from rest_framework.test import APITestCase
from app1.models import Fan, Swimmer, Team


class FansOrderedByAvgYoeOfSwimmersTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        fan1 = Fan.objects.create(fan_first_name='F1', fan_last_name='Fan1', fan_nationality='a',
                                  fan_date_of_birth='2002-10-10', fan_email='hjdvd@yahoo.com')
        fan2 = Fan.objects.create(fan_first_name='F2', fan_last_name='Fan2', fan_nationality='a',
                                  fan_date_of_birth='2002-10-10', fan_email='hjdvd@yahoo.com')
        fan3 = Fan.objects.create(fan_first_name='F3', fan_last_name='Fan3', fan_nationality='a',
                                  fan_date_of_birth='2002-10-10', fan_email='hjdvd@yahoo.com')

        Team.objects.create(team_name='a', team_founding_year=2000, team_budget=1000, team_motto='bhd',
                            team_abbreviation='a')

        swimmer1 = Swimmer.objects.create(swimmer_last_name='Swimmer1', swimmer_first_name='S1',
                                          swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                                          swimmer_years_of_experience=5, team_id=1)
        swimmer2 = Swimmer.objects.create(swimmer_last_name='Swimmer2', swimmer_first_name='S2',
                                          swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                                          swimmer_years_of_experience=10, team_id=1)
        swimmer3 = Swimmer.objects.create(swimmer_last_name='Swimmer3', swimmer_first_name='S4',
                                          swimmer_county='a', swimmer_date_of_birth='2002-10-10',
                                          swimmer_years_of_experience=15, team_id=1)

        fan1.swimmers.add(swimmer1, through_defaults={'fan_page_name': 'f1s1', 'fan_since_year': 2010})
        fan1.swimmers.add(swimmer2, through_defaults={'fan_page_name': 'f1s2', 'fan_since_year': 2010})
        fan2.swimmers.add(swimmer2, through_defaults={'fan_page_name': 'f2s2', 'fan_since_year': 2010})
        fan3.swimmers.add(swimmer1, through_defaults={'fan_page_name': 'f3s1', 'fan_since_year': 2010})
        fan3.swimmers.add(swimmer3, through_defaults={'fan_page_name': 'f3s3', 'fan_since_year': 2010})

    def test_fans_ordered_by_avg_yoe_of_swimmers_they_are_fans_of(self):
        response = self.client.get("/app1/fanAvgYoe/")

        self.assertEqual((response.data[0]['avg_swimmer_experience']), '10.00')
        self.assertEqual((response.data[1]['avg_swimmer_experience']), '10.00')
        self.assertEqual((response.data[2]['avg_swimmer_experience']), '7.50')

