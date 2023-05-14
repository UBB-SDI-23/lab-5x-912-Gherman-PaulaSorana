from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Team(models.Model):
    team_name = models.CharField(max_length=100)
    team_founding_year = models.IntegerField()
    team_budget = models.IntegerField()
    team_motto = models.CharField(max_length=100)
    team_abbreviation = models.CharField(max_length=10)
    team_description = models.CharField(max_length=5000, default="")
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["team_name"])]


class Swimmer(models.Model):
    swimmer_last_name = models.CharField(max_length=100)
    swimmer_first_name = models.CharField(max_length=100)
    swimmer_county = models.CharField(max_length=100)
    swimmer_date_of_birth = models.DateField()
    swimmer_years_of_experience = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='swimmers')
    fans = models.ManyToManyField("Fan", through='SwimmerFan')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["team", "id"]), models.Index(fields=["swimmer_years_of_experience", "id"]),
                   models.Index(fields=["swimmer_first_name"])]


class Coach(models.Model):
    coach_first_name = models.CharField(max_length=100)
    coach_last_name = models.CharField(max_length=100)
    coach_years_of_experience = models.IntegerField()
    coach_date_of_birth = models.DateField()
    coach_email = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

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
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.fan_last_name

    class Meta:
        ordering = ['id']
        indexes = [models.Index(fields=["fan_first_name", "fan_last_name", "fan_email"]),
                   models.Index(fields=["fan_first_name"])]


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


class UserProfile(models.Model):
    user_first_name = models.CharField(max_length=100)
    user_last_name = models.CharField(max_length=100)
    user_date_of_birth = models.DateField()
    user_bio = models.CharField(max_length=1000)
    user_location = models.CharField(max_length=100)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile", to_field="username"
    )
    activation_code = models.CharField(max_length=36)
    activation_expiry_date = models.DateTimeField()
    active = models.BooleanField()
    role = models.CharField(
        max_length=10,
        choices=(
            ("regular", "Regular"),
            ("moderator", "Moderator"),
            ("admin", "Admin"),
        ),
        default="regular",
    )
    page_size = models.IntegerField(default=10)




