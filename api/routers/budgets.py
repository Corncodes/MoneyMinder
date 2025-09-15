# Budget API endpoints for the MoneyMinder API
# This file defines all HTTP endpoints related to budget operations
# Handles budget creation, retrieval, updates, and deletion

from fastapi import (
    Depends,
    Response,
    APIRouter,
)
from models.budgets import BudgetOut, BudgetIn, BudgetsOut, Budget
from queries.budgets import BudgetQueries
from authenticator import authenticator


# Create the budgets router
router = APIRouter()


@router.get("/api/budgets", response_model=BudgetsOut)
async def get_budgets(
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Get all budgets for the authenticated user.

    Args:
        response: FastAPI response object
        queries: BudgetQueries dependency
        account_data: Current authenticated account data

    Returns:
        BudgetsOut object containing all user budgets, 404 if none found
    """
    records = queries.get_budgets(account_data.get("id"))
    if records is None:
        response.status_code = 404
    else:
        return {"budgets": records}


# @router.get("/api/budgets/{budget_id}", response_model=BudgetOut)
@router.get("/api/budgets/{budget_id}")
async def get_budget(
    budget_id: int,
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Get a specific budget by ID.

    Args:
        budget_id: ID of the budget to retrieve
        response: FastAPI response object
        queries: BudgetQueries dependency
        account_data: Current authenticated account data

    Returns:
        Budget object with expenses if found, 404 if not found
    """
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
    """
    Create a new budget for the authenticated user.

    Args:
        budget: BudgetIn object with budget creation data
        queries: BudgetQueries dependency
        account_data: Current authenticated account data

    Returns:
        BudgetOut object of the created budget
    """
    return queries.create_budget(budget, account_data.get("id"))


@router.put("/api/budgets/{budget_id}", response_model=BudgetOut)
async def update_budget(
    budget_id: int,
    budget_in: Budget,
    response: Response,
    queries: BudgetQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Update an existing budget.

    Args:
        budget_id: ID of the budget to update
        budget_in: Budget object with updated data
        response: FastAPI response object
        queries: BudgetQueries dependency
        account_data: Current authenticated account data

    Returns:
        BudgetOut object of the updated budget, 404 if not found
    """
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
    """
    Delete a budget.

    Args:
        budget_id: ID of the budget to delete
        queries: BudgetQueries dependency
        account_data: Current authenticated account data

    Returns:
        True if budget was deleted successfully, False otherwise
    """
    return queries.delete_budget(budget_id)
