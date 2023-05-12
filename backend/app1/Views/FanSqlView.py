from app1.Views.GenericSqlView import GenericSqlView


class FanSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("fanData.sql", "fanRemoveIndexes.sql", "fanAddIndexes.sql")


class TruncateFanSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("fanTruncate.sql")