from pydantic import BaseModel
from typing import Optional


class ExpenseOut(BaseModel):
    expense_id: Optional[str]
    expense_name: Optional[str]
    amount: Optional[int]
    ordering: Optional[int]
    budget_id: Optional[int]


class ExpenseIn(BaseModel):
    expense_name: str
    amount: int
