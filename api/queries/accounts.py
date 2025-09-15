# Account database queries for the MoneyMinder API
# This file handles all database operations related to user accounts
# Uses psycopg_pool for connection management and PostgreSQL

import os
from psycopg_pool import ConnectionPool
from models.accounts import AccountIn, AccountOutWithPassword

# Create a connection pool for database operations
# Uses the DATABASE_URL environment variable for connection details
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountQueries:
    """
    Class containing all database operations for user accounts.
    Handles account creation, retrieval, and data transformation.
    """

    def get_account(self, email: str) -> AccountOutWithPassword:
        """
        Retrieve an account from the database using the email address.

        Args:
            email: The email address to search for

        Returns:
            AccountOutWithPassword object if found, None otherwise
        """
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
            return None

    def create_account(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        """
        Create a new user account in the database.

        Args:
            account: AccountIn object containing user registration data
            hashed_password: Bcrypt hashed password for secure storage

        Returns:
            AccountOutWithPassword object of the created account
        """
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
        """
        Convert a database record tuple to an AccountOutWithPassword object.

        Args:
            record: Database record tuple from SELECT query

        Returns:
            AccountOutWithPassword object with data from the record
        """
        return AccountOutWithPassword(
            id=record[0],
            email=record[1],
            first_name=record[2],
            last_name=record[3],
            hashed_password=record[4],
        )
