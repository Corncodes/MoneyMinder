from pydantic import BaseModel
from typing import List
from budgets import BudgetOut


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    budgets: List[BudgetOut] = []


class AccountOutWithPassword(AccountOut):
    hashed_password: str
