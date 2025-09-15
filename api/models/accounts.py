# Account data models for the MoneyMinder API
# This file defines the Pydantic models for user account data
# These models handle data validation and serialization for account operations

from pydantic import BaseModel
from typing import List
from .budgets import BudgetOut


class DuplicateAccountError(ValueError):
    """
    Custom exception raised when attempting to create an account
    with an email that already exists in the system.
    """

    pass


class AccountIn(BaseModel):
    """
    Input model for creating a new user account.
    Contains the required fields for account registration.
    """

    email: str  # User's email address (used as username)
    password: str  # Plain text password (will be hashed)
    first_name: str  # User's first name
    last_name: str  # User's last name


class AccountOut(BaseModel):
    """
    Output model for account data returned to clients.
    Excludes sensitive information like passwords.
    """

    id: str  # Unique account identifier
    email: str  # User's email address
    first_name: str  # User's first name
    last_name: str  # User's last name
    budgets: List[BudgetOut] = (
        []
    )  # List of budgets associated with this account


class AccountOutWithPassword(AccountOut):
    """
    Extended account model that includes the hashed password.
    Used internally for authentication purposes only.
    Should never be returned to clients.
    """

    hashed_password: str  # Bcrypt hashed password for authentication
