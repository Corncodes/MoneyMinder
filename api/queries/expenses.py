# Expense database queries for the MoneyMinder API
# This file handles all database operations related to expenses
# Uses psycopg_pool for connection management and PostgreSQL

import os
from psycopg_pool import ConnectionPool

# from models.expenses import ExpenseOut

# Create a connection pool for database operations
# Uses the DATABASE_URL environment variable for connection details
pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class ExpenseQueries:
    """
    Class containing all database operations for expenses.
    Handles expense creation, updates, deletion, and data transformation.
    """

    def get_expenses(self, id: int):
        """
        Retrieve expenses for a specific budget.
        Currently not implemented.

        Args:
            id: Budget ID to get expenses for

        Returns:
            None (method not implemented)
        """
        pass

    def create_expense(self, expense):
        """
        Create a new expense in the database.

        Args:
            expense: ExpenseIn object containing expense data

        Returns:
            True if expense was created successfully, None otherwise
        """
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
                        expense.budget_id,
                    ],
                )
                row = cur.fetchone()
                id = row[0]
                if id is not None:
                    return True

    def update_expense(self, expense_id, data):
        """
        Update an existing expense in the database.

        Args:
            expense_id: ID of the expense to update
            data: UpdateExpense object containing new expense data

        Returns:
            Dictionary with updated expense data if successful, None otherwise
        """
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
        """
        Delete an expense from the database.

        Args:
            expense_id: ID of the expense to delete

        Returns:
            True if expense was deleted successfully, False otherwise
        """
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
