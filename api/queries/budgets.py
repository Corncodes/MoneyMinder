import os
from psycopg_pool import ConnectionPool
from models.budgets import BudgetIn, BudgetOut, BudgetsOut

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class BudgetQueries:
    def get_budgets(self, id: int) -> BudgetsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM budgets
                        WHERE account_id = %s
                        """,
                        [id]
                    )

                    budgets = []
                    rows = cur.fetchall()
                    for row in rows:
                        budget = self.budget_record_to_dict(row, cur.description)
                        budgets.append(budget)
                    return budgets
        except Exception as e:
            print(e)
            return {"message": "Could not get that budget"}


    def get_budget(self, budget_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM budgets
                        WHERE id = %s
                        """,
                        [budget_id],
                    )

                    row = cur.fetchone()
                    return self.budget_record_to_dict(row, cur.description)
        except Exception as e:
            print(e)
            return {"message": "Could not get that budget"}


    def create_budget(self, budget, account_id):
        id = None
        budgets = self.get_budgets(account_id)
        if not budgets:
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
                        VALUES (%s, TRUE, %s, %s)
                        returning id
                        """,
                        [
                            budget.name,
                            budget.monthly_income,
                            account_id,
                        ]
                    )

                    row = cur.fetchone()
                    id = row[0]

        else:
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
                        VALUES (%s, FALSE, %s, %s)
                        returning id
                        """,
                        [
                            budget.name,
                            budget.monthly_income,
                            account_id,
                        ]
                    )
                    
                    row = cur.fetchone()
                    id = row[0] 
                    
        if id is not None:
            return self.get_budget(id)


    def budget_record_to_dict(self, row, description):
        budget = None
        if row is not None:
            budget = {}
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
            for i, column in enumerate(description):
                if column.name in budget_fields:
                    budget[column.name] = row[i]
        return budget


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
                    budget_id
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
                    print("Row is not None. Record has been updated to:", record)
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
