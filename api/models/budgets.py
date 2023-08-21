from pydantic import BaseModel
from typing import Optional


class BudgetIn(BaseModel):
    name: str
    monthly_income: int


class Budget(BudgetIn):
    name: str
    primary_budget: bool
    complete: Optional[bool]
    monthly_income: int
    monthly_spending_total: Optional[int]
    monthly_balance: Optional[int]


class BudgetOut(BaseModel):
    id: str
    name: str
    primary_budget: bool
    complete: Optional[bool]
    monthly_income: int
    monthly_spending_total: Optional[int]
    monthly_balance: Optional[int]
    account_id: int

class BudgetsOut(BaseModel):
    budgets: list[BudgetOut]