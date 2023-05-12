from app1.Views.GenericSqlView import GenericSqlView


class SwimmerSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("swimmerData.sql", "swimmerRemoveIndexes.sql", "swimmerAddIndexes.sql")


class TruncateSwimmerSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("swimmerTruncate.sql")
