from fastapi import APIRouter, Depends, Response

from queries.accounts import AccountQueries
from models.accounts import AccountOut

router = APIRouter()

@router.get("/api/accounts/{account_id}", response_model=AccountOut)
async def get_account(
    account_email: str,
    response: Response,
    queries: AccountQueries = Depends(),
):
    record = queries.get_account(account_email)
    if record is None:
        response.status_code = 404
    else:
        return record