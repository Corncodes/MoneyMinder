from pydantic import BaseModel
from typing import Optional


class ExpenseOut(BaseModel):
    expense_id: Optional[int]
    expense_name: Optional[str]
    amount: Optional[int]
    ordering: Optional[int]
    budget_id: Optional[int]


class ExpenseIn(BaseModel):
    expense_name: str
    amount: int


class UpdateExpense(ExpenseIn):
    expense_name: str
    amount: int
    ordering: int
