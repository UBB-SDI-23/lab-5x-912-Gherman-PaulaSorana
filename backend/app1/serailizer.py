from rest_framework import serializers
from .models import Swimmer, Team, Coach, Fan, SwimmerFan


class TeamSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(max_length=100)
    team_founding_year = serializers.IntegerField()
    team_budget = serializers.IntegerField()
    team_motto = serializers.CharField(max_length=100)
    team_abbreviation = serializers.CharField(max_length=10)
    no_swim = serializers.IntegerField(read_only=True)

    def validate_team_name(self, value):
        existing_teams = Team.objects.filter(team_name=value)

        if self.instance:
            existing_teams = existing_teams.exclude(pk=self.instance.pk)
        if existing_teams.exists():
            raise serializers.ValidationError("This team name is already in use.")
        return value

    def validate_team_founding_year(self, value):
        if value > 2023 or value < 1950:
            raise serializers.ValidationError("Not a valid year!")
        return value

    class Meta:
        model = Team
        fields = "__all__"


class SwimmerSerializer(serializers.ModelSerializer):
    swimmer_last_name = serializers.CharField(max_length=100)
    swimmer_first_name = serializers.CharField(max_length=100)
    swimmer_county = serializers.CharField(max_length=100)
    swimmer_date_of_birth = serializers.DateField()
    swimmer_years_of_experience = serializers.IntegerField()
    team = Team()

    def validate_swimmer_years_of_experience(self, value):
        if value < 0:
            raise serializers.ValidationError("Years of experience must be greater than or equal to zero.")
        return value

    class Meta:
        model = Swimmer
        fields = "__all__"


class SwimmerSerializerId(serializers.ModelSerializer):
    swimmer_last_name = serializers.CharField(max_length=100)
    swimmer_first_name = serializers.CharField(max_length=100)
    swimmer_county = serializers.CharField(max_length=100)
    swimmer_date_of_birth = serializers.DateField()
    swimmer_years_of_experience = serializers.IntegerField()
    team = Team()
    fans = Fan()

    def validate_swimmer_years_of_experience(self, value):
        if value < 0:
            raise serializers.ValidationError("Years of experience must be greater than or equal to zero.")
        return value

    class Meta:
        model = Swimmer
        fields = "__all__"
        depth = 1


class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = "__all__"


class CoachSerializerId(serializers.ModelSerializer):
    def validate_coach_email(self, value):
        existing_emails = Coach.objects.filter(coach_email=value)

        if self.instance:
            existing_emails = existing_emails.exclude(pk=self.instance.pk)
        if existing_emails.exists():
            raise serializers.ValidationError("This email address is already in use!")
        return value

    class Meta:
        model = Coach
        fields = "__all__"
        depth = 1


class FanSerializer(serializers.ModelSerializer):
    def validate_fan_email(self, value):
        existing_emails = Fan.objects.filter(fan_email=value)

        if self.instance:
            existing_emails = existing_emails.exclude(pk=self.instance.pk)
        if existing_emails.exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    class Meta:
        model = Fan
        fields = "__all__"


class FanSerializerId(serializers.ModelSerializer):
    def validate_fan_email(self, value):
        existing_emails = Fan.objects.filter(fan_email=value)

        if self.instance:
            existing_emails = existing_emails.exclude(pk=self.instance.pk)
        if existing_emails.exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    class Meta:
        model = Fan
        fields = "__all__"
        depth = 1


class FanSerializerAvg(serializers.ModelSerializer):
    fan_first_name = serializers.CharField(max_length=100)
    fan_last_name = serializers.CharField(max_length=100)
    fan_nationality = serializers.CharField(max_length=100)
    fan_date_of_birth = serializers.DateField()
    fan_email = serializers.CharField(max_length=100)
    swimmers = Swimmer()
    avg_swimmer_experience = serializers.DecimalField(max_digits=4, decimal_places=2, read_only=True)

    class Meta:
        model = Fan
        fields = ('fan_first_name', 'fan_last_name', 'fan_nationality', 'fan_date_of_birth', 'fan_email', 'swimmers',
                  'avg_swimmer_experience')
        depth = 1


class TeamSerializerNo(serializers.ModelSerializer):
    team_name = serializers.CharField(max_length=100)
    team_founding_year = serializers.IntegerField()
    team_budget = serializers.IntegerField()
    team_motto = serializers.CharField(max_length=100)
    team_abbreviation = serializers.CharField(max_length=10)
    swimmers = Swimmer()
    no_of_swimmers = serializers.IntegerField()

    class Meta:
        model = Fan
        fields = ('team_name', 'team_founding_year', 'team_budget', 'team_motto', 'team_abbreviation', 'swimmers',
                  'no_of_swimmers')
        depth = 1


class SwimmerFanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SwimmerFan
        fields = "__all__"








