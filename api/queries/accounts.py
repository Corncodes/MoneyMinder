import os
from psycopg_pool import ConnectionPool
from models.accounts import AccountIn, AccountOutWithPassword


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountQueries:
    def get_account(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id,
                            email,
                            first_name,
                            last_name,
                            hashed_password
                        FROM accounts
                        WHERE email = %s
                        """,
                        [email],
                    )

                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def create_account(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO accounts (
                        first_name, last_name, email, hashed_password
                    )
                    VALUES (%s, %s, %s, %s)
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password,
                    ],
                )
        return self.get_account(account.email)

    def record_to_account_out(self, record):
        return AccountOutWithPassword(
            id=record[0],
            email=record[1],
            first_name=record[2],
            last_name=record[3],
            hashed_password=record[4],
        )
