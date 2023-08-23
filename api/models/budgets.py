from pydantic import BaseModel
from typing import Optional, List
from .expenses import ExpenseOut


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
    id: int
    name: str
    primary_budget: bool
    complete: Optional[bool]
    monthly_income: int
    monthly_spending_total: Optional[int]
    monthly_balance: Optional[int]
    account_id: int
    expenses: List[ExpenseOut] = []


class BudgetsOut(BaseModel):
    budgets: list[BudgetOut]
