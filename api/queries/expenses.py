import os
from psycopg_pool import ConnectionPool
from models.expenses import ExpenseOut

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class ExpenseQueries:
    def get_expenses(self, id: int):
        pass

    def create_expense(self, expense, budget_id):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO expense_items (
                        expense_name,
                        amount,
                        budget_id
                    )
                    VALUES (%s, %s, %s)
                    RETURNING expense_id
                    """,
                    [
                        expense.expense_name,
                        expense.amount,
                        budget_id,
                    ],
                )
                row = cur.fetchone()
                id = row[0]
                if id is not None:
                    return True
