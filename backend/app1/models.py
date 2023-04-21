from django.db import models

# Create your models here.


class Team(models.Model):
    team_name = models.CharField(max_length=100)
    team_founding_year = models.IntegerField()
    team_budget = models.IntegerField()
    team_motto = models.CharField(max_length=100)
    team_abbreviation = models.CharField(max_length=10)
    team_description = models.CharField(max_length=5000, default="")

    class Meta:
        ordering = ['id']


class Swimmer(models.Model):
    swimmer_last_name = models.CharField(max_length=100)
    swimmer_first_name = models.CharField(max_length=100)
    swimmer_county = models.CharField(max_length=100)
    swimmer_date_of_birth = models.DateField()
    swimmer_years_of_experience = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='swimmers')
    fans = models.ManyToManyField("Fan", through='SwimmerFan')

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["team", "id"]), models.Index(fields=["swimmer_years_of_experience"])]


class Coach(models.Model):
    coach_first_name = models.CharField(max_length=100)
    coach_last_name = models.CharField(max_length=100)
    coach_years_of_experience = models.IntegerField()
    coach_date_of_birth = models.DateField()
    coach_email = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, unique=True)

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["team"])]


class Fan(models.Model):
    fan_first_name = models.CharField(max_length=100)
    fan_last_name = models.CharField(max_length=100)
    fan_nationality = models.CharField(max_length=100)
    fan_date_of_birth = models.DateField()
    fan_email = models.CharField(max_length=100)
    swimmers = models.ManyToManyField(Swimmer, through='SwimmerFan')

    def __str__(self):
        return self.fan_last_name

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["fan_first_name", "fan_last_name", "fan_email"])]


class SwimmerFan(models.Model):
    swimmer = models.ForeignKey(Swimmer, on_delete=models.CASCADE)
    fan = models.ForeignKey(Fan, on_delete=models.CASCADE)
    fan_page_name = models.CharField(max_length=100)
    fan_since_year = models.IntegerField()

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["swimmer", "fan"]),
                   models.Index(fields=['swimmer']),
                   models.Index(fields=['fan']),
                   models.Index(fields=['fan_page_name']),
                   models.Index(fields=['fan_since_year'])
                   ]



