from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models.budgets import BudgetOut, BudgetIn
from queries.budgets import BudgetQueries


@router.post("/api/budgets", response_model= )
async def create_budget(
    info: BudgetIn,
    request: Request,
    response: Response,
    accounts: BudgetQueries = Depends(),
):
    pass
            