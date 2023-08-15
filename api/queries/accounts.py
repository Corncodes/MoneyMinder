import os
from psycopg_pool import ConnectionPool
from models.accounts import AccountOut

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class AccountQueries():
    def get_account(self, account_email):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id, email, first_name, last_name
                        FROM accounts
                        WHERE email = %s
                        """,
                        [account_email]
                    )

                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}


    def record_to_account_out(self, record):
        # account = None
        return AccountOut(
            id=record[0],
            email=record[1],
            first_name=record[2],
            last_name=record[3],
        )