import os
import subprocess


def run_sql_script(path: str) -> None:
    os.environ["PGPASSWORD"] = os.environ["DB_PASS"]
    # psql -h hostname -d database_name -U user_name -p 5432 -a -q -f filepath
    path = os.path.join('/home/ubuntu/', path)
    print(path)
    sql_command = f'psql -h {os.environ["DB_HOST"]} -d {os.environ["DB_NAME"]} -U {os.environ["DB_USER"]} -p {os.environ["DB_PORT"]} -a -q -f {path}'
    subprocess.Popen(sql_command, shell=True)
    print(sql_command)