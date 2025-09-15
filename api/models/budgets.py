# Budget data models for the MoneyMinder API
# This file defines the Pydantic models for budget data
# These models handle data validation and serialization for budget operations

from pydantic import BaseModel
from typing import Optional, List
from .expenses import ExpenseOut


class BudgetIn(BaseModel):
    """
    Input model for creating a new budget.
    Contains the minimum required fields for budget creation.
    """

    name: str  # Name of the budget
    monthly_income: int  # Monthly income amount in cents


class Budget(BudgetIn):
    """
    Complete budget model with all fields including computed values.
    Used for updating existing budgets.
    """

    name: str  # Name of the budget
    primary_budget: bool  # Whether this is the user's primary budget
    complete: Optional[bool]  # Whether the budget is complete
    monthly_income: int  # Monthly income amount in cents
    monthly_spending_total: Optional[int]  # Total spending for the month
    monthly_balance: Optional[int]  # Remaining balance after expenses


class BudgetOut(BaseModel):
    """
    Output model for budget data returned to clients.
    Includes all budget information and associated expenses.
    """

    id: int  # Unique budget identifier
    name: str  # Name of the budget
    primary_budget: bool  # Whether this is the user's primary budget
    complete: Optional[bool]  # Whether the budget is complete
    monthly_income: int  # Monthly income amount in cents
    monthly_spending_total: Optional[int]  # Total spending for the month
    monthly_balance: Optional[int]  # Remaining balance after expenses
    account_id: int  # ID of the account that owns this budget
    expenses: List[ExpenseOut] = []  # List of expenses in this budget


class BudgetsOut(BaseModel):
    """
    Container model for returning multiple budgets.
    Used when fetching all budgets for a user.
    """

    budgets: list[BudgetOut]  # List of all budgets for the user
