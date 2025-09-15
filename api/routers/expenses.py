# Expense API endpoints for the MoneyMinder API
# This file defines all HTTP endpoints related to expense operations
# Handles expense creation, updates, and deletion

from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.expenses import ExpenseOut, ExpenseIn, UpdateExpense
from queries.expenses import ExpenseQueries
from authenticator import authenticator


# Create the expenses router
router = APIRouter()


@router.post("/api/expenses", response_model=bool)
async def create_expense(
    expense: ExpenseIn,
    queries: ExpenseQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Create a new expense.

    Args:
        expense: ExpenseIn object with expense creation data
        queries: ExpenseQueries dependency
        account_data: Current authenticated account data

    Returns:
        True if expense was created successfully, False otherwise
    """
    return queries.create_expense(expense)


@router.put("/api/expenses/{expense_id}", response_model=ExpenseOut)
async def update_expense(
    expense_id: int,
    expense_in: UpdateExpense,
    response: Response,
    queries: ExpenseQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
    ),  # Added this
):
    """
    Update an existing expense.

    Args:
        expense_id: ID of the expense to update
        expense_in: UpdateExpense object with updated data
        response: FastAPI response object
        queries: ExpenseQueries dependency
        account_data: Current authenticated account data

    Returns:
        ExpenseOut object of the updated expense, 404 if not found
    """
    record = queries.update_expense(expense_id, expense_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/expenses/{expense_id}", response_model=bool)
async def delete_expense(
    expense_id: int,
    queries: ExpenseQueries = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
    ),  # Added this
):
    """
    Delete an expense.

    Args:
        expense_id: ID of the expense to delete
        queries: ExpenseQueries dependency
        account_data: Current authenticated account data

    Returns:
        True if expense was deleted successfully, False otherwise
    """
    return queries.delete_expense(expense_id)
