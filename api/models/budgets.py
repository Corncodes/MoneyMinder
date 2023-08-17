from pydantic import BaseModel


class BudgetIn(BaseModel):
    name: str
    monthly_income: int
    monthly_spending_total: int
    monthly_balance: 


class BudgetOut(BaseModel):
    id: str
    name: str
    primary_budget: bool
    monthly_income: int
    monthly_spending_total: int
    monthly_balance: int
    accounts_id: int

class ExpenseIn(BaseModel):
    
