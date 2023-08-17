from pydantic import BaseModel
from typing import Optional


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
    budgets: Optional[str]


class AccountOutWithPassword(AccountOut):
    hashed_password: str
