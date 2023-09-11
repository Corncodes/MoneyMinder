from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.budgets import BudgetOut, BudgetIn, BudgetsOut, Budget
from queries.budgets import BudgetQueries
from authenticator import authenticator


router = APIRouter()


@router.get("/api/budgets", response_model=BudgetsOut)
async def get_budgets(
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    records = queries.get_budgets(account_data.get("id"))
    if records is None:
        response.status_code = 404
    else:
        return {"budgets": records}


@router.get("/api/budgets/{budget_id}")
async def get_budget(
    budget_id: int,
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_budget(budget_id)
    print(record)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.post("/api/budgets", response_model=BudgetOut)
async def create_budget(
    budget: BudgetIn,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create_budget(budget, account_data.get("id"))


@router.put("/api/budgets/{budget_id}", response_model=BudgetOut)
async def update_budget(
    budget_id: int,
    budget_in: Budget,
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.update_budget(budget_id, budget_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/budgets/{budget_id}", response_model=bool)
async def delete_budget(
    budget_id: int,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.delete_budget(budget_id)
