import os
from psycopg_pool import ConnectionPool
# from models.expenses import ExpenseOut

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

    def update_expense(self, expense_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.expense_name,
                    data.amount,
                    data.ordering,
                    expense_id,
                ]
                cur.execute(
                    """
                    UPDATE expense_items
                    SET expense_name = %s,
                        amount = %s,
                        ordering = %s
                    WHERE expense_id = %s
                    RETURNING expense_id,
                        expense_name,
                        amount,
                        ordering,
                        budget_id
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                        print(
                            "Row is not None. Record has been updated to:",
                            record,
                        )
                    return record

    def delete_expense(self, expense_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        DELETE FROM expense_items
                        WHERE expense_id = %s
                        RETURNING expense_id
                        """,
                    [expense_id],
                )
                row = cur.fetchone()
                if row is not None:
                    return True
                return False
