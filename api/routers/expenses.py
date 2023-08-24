from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.expenses import ExpenseOut, ExpenseIn, UpdateExpense
from queries.expenses import ExpenseQueries
from authenticator import authenticator


router = APIRouter()


@router.post("/api/expenses", response_model=bool)
async def create_expense(
    expense: ExpenseIn,
    budget_id: int,
    queries: ExpenseQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_expense(expense, budget_id)


@router.put("/api/expenses/{expense_id}", response_model=ExpenseOut)
async def update_expense(
    expense_id: int,
    expense_in: UpdateExpense,
    response: Response,
    queries: ExpenseQueries = Depends(),
):
    record = queries.update_expense(expense_id, expense_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/expenses/{expense_id}", response_model=bool)
async def delete_expense(
    expense_id: int,
    queries: ExpenseQueries = Depends(),
):
    return queries.delete_expense(expense_id)
