from app1.Views.GenericSqlView import GenericSqlView


class CoachSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("coachData.sql", "coachRemoveIndexes.sql", "coachAddIndexes.sql")


class TruncateCoachSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("coachTruncate.sql")
