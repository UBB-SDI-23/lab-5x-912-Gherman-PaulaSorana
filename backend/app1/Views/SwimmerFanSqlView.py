from app1.Views.GenericSqlView import GenericSqlView


class SwimmerFanSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("swimmerFanData.sql", "swimmerfanRemoveIndexes.sql", "swimmerfanAddIndexes.sql")


class TruncateSwimmerFanSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("swimmerFanTruncate.sql")

