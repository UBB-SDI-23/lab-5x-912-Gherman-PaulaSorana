from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from app1.permissions import IsAdminOrReadOnly
from app1.run_sql_data import run_sql_script


class GenericSqlView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    script_path = ""
    drop_indexes_path = ""
    add_indexes_path = ""

    def __init__(self, script_path: str, drop_index_path: str = '', add_index_path: str = '') -> None:
        super().__init__()
        self.script_path = script_path
        self.drop_indexes_path = drop_index_path
        self.add_indexes_path = add_index_path

    def post(self, request: Request) -> Response:
        self.check_permissions(request)

        if self.drop_indexes_path != '':
            run_sql_script(self.drop_indexes_path)

        run_sql_script(self.script_path)

        if self.add_indexes_path != '':
            run_sql_script(self.add_indexes_path)

        return Response({"message": "SQL script executed successfully"})

