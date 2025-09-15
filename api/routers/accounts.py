# Account API endpoints for the MoneyMinder API
# This file defines all HTTP endpoints related to user account operations
# Handles account creation, authentication, and account retrieval

from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from models.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    DuplicateAccountError,
)
from queries.accounts import AccountQueries


class AccountForm(BaseModel):
    """
    Form model for login requests.
    Contains username (email) and password fields.
    """

    username: str  # User's email address
    password: str  # Plain text password


class AccountToken(Token):
    """
    Token model that includes account information.
    Used for authentication responses.
    """

    account: AccountOut


class HttpError(BaseModel):
    """
    Standard error response model.
    Used for consistent error handling across endpoints.
    """

    detail: str


# Create the accounts router
router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    """
    Create a new user account and automatically log them in.

    This endpoint:
    1. Hashes the provided password
    2. Creates the account in the database
    3. Generates a JWT token for authentication
    4. Returns the token with account information

    Args:
        info: AccountIn object with registration data
        request: FastAPI request object
        response: FastAPI response object
        accounts: AccountQueries dependency

    Returns:
        AccountToken with authentication token and account data
    """
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    """
    Get the current authentication token for the logged-in user.

    Args:
        request: FastAPI request object
        account: Current account data from authentication

    Returns:
        AccountToken if user is authenticated, None otherwise
    """
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    """
    Protected endpoint that requires authentication.
    Used to test if a user is properly authenticated.

    Args:
        account_data: Current account data from authentication

    Returns:
        True if user is authenticated
    """
    return True


@router.get(
    "/api/accounts/{account_email}", response_model=AccountOutWithPassword
)
async def get_account(
    account_email: str,
    response: Response,
    queries: AccountQueries = Depends(),
    account: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),  # Will added this
):
    """
    Get account information by email address.

    Args:
        account_email: Email address of the account to retrieve
        response: FastAPI response object
        queries: AccountQueries dependency
        account: Current authenticated account

    Returns:
        AccountOutWithPassword object if found, 404 if not found
    """
    record = queries.get_account(account_email)
    if record is None:
        response.status_code = 404
    else:
        return record
