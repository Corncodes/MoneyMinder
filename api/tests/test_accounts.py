from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries


client = TestClient(app)


class MockAccountQueries:
    def get_account(self, account_email: str):
        return {
            "id": "1",
            "email": "test@test.com",
            "first_name": "test",
            "last_name": "test",
            "budgets": [],
            "hashed_password": "abcd555"
        }


def test_get_account():

    app.dependency_overrides[AccountQueries] = MockAccountQueries

    response = client.get("/api/accounts/{account_email}")

    assert response.status_code == 200
    assert response.json() == {"id": "1", "email": "test@test.com", "first_name": "test", "last_name": "test", "budgets": [], "hashed_password": "abcd555"}

    app.dependency_overrides = {}
