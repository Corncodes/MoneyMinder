import os
from psycopg_pool import ConnectionPool
from models.budgets import BudgetsOut


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class BudgetQueries:
    def get_budget(self, budget_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT budgets.*, expense_items.*
                        FROM budgets
                        LEFT JOIN expense_items
                        ON (budgets.id = expense_items.budget_id)
                        WHERE budgets.id = %s
                        """,
                        [budget_id],
                    )

                    rows = cur.fetchall()
                    budget_fields = [
                        "id",
                        "name",
                        "primary_budget",
                        "complete",
                        "monthly_income",
                        "monthly_spending_total",
                        "monthly_balance",
                        "account_id",
                    ]
                    expense_fields = [
                        "expense_id",
                        "expense_name",
                        "amount",
                        "ordering",
                        "budget_id",
                    ]
                    budget = self.record_to_dict(
                        rows[0], cur.description, budget_fields
                    )
                    budget["expenses"] = []
                    if rows[0][-1]:
                        for row in rows:
                            budget["expenses"].append(
                                self.record_to_dict(
                                    row, cur.description, expense_fields
                                )
                            )
                    return budget
        except Exception as e:
            print(e)
            return {"message": "Could not get that budget"}

    def get_budgets(self, account_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT id
                        FROM budgets
                        WHERE account_id = %s
                        """,
                        [account_id],
                    )
                    budgets = []
                    rows = cur.fetchall()
                    for row in rows:
                        budgets.append(self.get_budget(*row))
                    return budgets
        except Exception as e:
            print(e)
            return {"message": "Could not get that budget"}

    def create_budget(self, budget, account_id):
        id = None
        budgets = self.get_budgets(account_id)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO budgets (
                        name,
                        primary_budget,
                        monthly_income,
                        account_id
                    )
                    VALUES (%s, %s, %s, %s)
                    returning id
                    """,
                    [
                        budget.name,
                        not budgets,
                        budget.monthly_income,
                        account_id,
                    ],
                )

                row = cur.fetchone()
                id = row[0]
        if id is not None:
            return self.get_budget(id)

    def record_to_dict(self, row, description, fields):
        dictionary = None
        if row is not None:
            dictionary = {}
            for i, column in enumerate(description):
                if column.name in fields:
                    dictionary[column.name] = row[i]
        return dictionary

    def update_budget(self, budget_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.name,
                    data.primary_budget,
                    data.complete,
                    data.monthly_income,
                    data.monthly_spending_total,
                    data.monthly_balance,
                    budget_id,
                ]
                cur.execute(
                    """
                    UPDATE budgets
                    SET name = %s,
                        primary_budget = %s,
                        complete = %s,
                        monthly_income = %s,
                        monthly_spending_total = %s,
                        monthly_balance = %s
                    WHERE id = %s
                    RETURNING id,
                        name,
                        primary_budget,
                        complete,
                        monthly_income,
                        monthly_spending_total,
                        monthly_balance,
                        account_id
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
                        "Row is not None. Record has been updated to:", record
                    )
                return record

    def delete_budget(self, budget_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                        DELETE FROM budgets
                        WHERE id = %s
                        RETURNING id
                        """,
                    [budget_id],
                )
                row = cur.fetchone()
                if row is not None:
                    return True
                return False
