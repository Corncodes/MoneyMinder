# Expense data models for the MoneyMinder API
# This file defines the Pydantic models for expense data
# These models handle data validation and serialization for expense operations

from pydantic import BaseModel
from typing import Optional


class ExpenseOut(BaseModel):
    """
    Output model for expense data returned to clients.
    All fields are optional to handle partial data scenarios.
    """

    expense_id: Optional[int]  # Unique expense identifier
    expense_name: Optional[str]  # Name/description of the expense
    amount: Optional[int]  # Expense amount in cents
    ordering: Optional[int]  # Display order for the expense
    budget_id: Optional[int]  # ID of the budget this expense belongs to


class ExpenseIn(BaseModel):
    """
    Input model for creating a new expense.
    Contains the required fields for expense creation.
    """

    expense_name: str  # Name/description of the expense
    amount: int  # Expense amount in cents
    budget_id: int  # ID of the budget this expense belongs to


class UpdateExpense(ExpenseIn):
    """
    Model for updating existing expenses.
    Extends ExpenseIn to include the ordering field for display purposes.
    """

    expense_name: str  # Name/description of the expense
    amount: int  # Expense amount in cents
    ordering: int  # Display order for the expense
