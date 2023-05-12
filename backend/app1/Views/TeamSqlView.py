from app1.Views.GenericSqlView import GenericSqlView


class TeamSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("teamData.sql", "teamRemoveIndexes.sql", "teamAddIndexes.sql")


class TruncateTeamSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("teamTruncate.sql")
