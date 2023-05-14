from collections import OrderedDict
from typing import Any

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Swimmer, Team, Coach, Fan, SwimmerFan, UserProfile
from rest_framework_simplejwt.serializers import RefreshToken, TokenObtainPairSerializer


class DynamicSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        depth = kwargs.pop('depth', None)
        super().__init__(*args, **kwargs)
        self.Meta.depth = 1 if depth is None else depth


class TeamSerializer(DynamicSerializer):
    team_name = serializers.CharField(max_length=100)
    team_founding_year = serializers.IntegerField()
    team_budget = serializers.IntegerField()
    team_motto = serializers.CharField(max_length=100)
    team_abbreviation = serializers.CharField(max_length=10)
    no_swim = serializers.IntegerField(read_only=True)
    added_by = User()

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
        depth = 1


class SwimmerSerializer(DynamicSerializer):
    swimmer_last_name = serializers.CharField(max_length=100)
    swimmer_first_name = serializers.CharField(max_length=100)
    swimmer_county = serializers.CharField(max_length=100)
    swimmer_date_of_birth = serializers.DateField()
    swimmer_years_of_experience = serializers.IntegerField()
    team = Team()
    added_by = User()

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


class CoachSerializer(DynamicSerializer):
    added_by = User()
    def validate_coach_years_of_experience(self, value):
        if value < 0:
            raise serializers.ValidationError("Years of experience must be greater than or equal to zero.")
        return value

    class Meta:
        model = Coach
        fields = "__all__"


class CoachSerializerId(serializers.ModelSerializer):
    def validate_coach_years_of_experience(self, value):
        if value < 0:
            raise serializers.ValidationError("Years of experience must be greater than or equal to zero.")
        return value

    class Meta:
        model = Coach
        fields = "__all__"
        depth = 1


class FanSerializer(DynamicSerializer):
    added_by = User()
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


class UserSerializer(serializers.ModelSerializer):
    def validate_password(self, value):
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError('Password must contain at least one digit.')

        if not any(char.isupper() for char in value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')

        return value

    class Meta:
        model = User
        fields = ("username", "password")


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = (
                    "user",
                    "user_first_name",
                    "user_last_name",
                    "user_date_of_birth",
                    "user_bio",
                    "user_location",
                    "activation_code",
                    "activation_expiry_date",
                    "active"
        )

    def create(self, validated_data: OrderedDict[str, Any]) -> UserProfile:
        user_data = validated_data.pop("user")
        user_data['is_active'] = False
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile


class UserProfileDetailSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    teams_count = serializers.IntegerField()
    swimmers_count = serializers.IntegerField()
    coaches_count = serializers.IntegerField()
    fans_count = serializers.IntegerField()

    def get_username(self, user_profile: UserProfile) -> str:
        return user_profile.user_id  # type: ignore

    class Meta:
        model = UserProfile
        fields = (
            "username",
            "user_first_name",
            "user_last_name",
            "user_date_of_birth",
            "user_bio",
            "user_location",
            "teams_count",
            "swimmers_count",
            "coaches_count",
            "fans_count"
        )


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        user = UserProfile.objects.get(user_id = self.user.username)

        refresh["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "user_first_name": user.user_first_name,
            "user_last_name": user.user_last_name,
            "user_bio": user.user_bio,
            "user_date_of_birth": f'{user.user_date_of_birth}',
            "user_location": user.user_location,
            "role": user.role,
            "page_size": user.page_size
        }

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


class UserDetailsSerializer(serializers.ModelSerializer[UserProfile]):
    username = serializers.SerializerMethodField()

    def get_username(self, user_profile: UserProfile) -> str:
        return user_profile.user_id  # type: ignore

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "username",
            "role",
            "page_size"
        )

