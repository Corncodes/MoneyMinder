from pydantic import BaseModel


class BudgetIn(BaseModel):
    name: str
    monthly_income: int


class BudgetOut(BaseModel):
    id: str
    name: str
    primary_budget: bool
    monthly_income: int
    monthly_spending_total: int
    monthly_balance: int
    account_id: int
    complete: bool
