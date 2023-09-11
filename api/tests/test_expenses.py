from fastapi.testclient import TestClient
from main import app
from queries.expenses import ExpenseQueries
from authenticator import authenticator


client = TestClient(app)


class MockExpenseQueries:
    def create_expense(self, expense):
        result = {"expense_name": "name", "amount": 0, "budget_id": 0}
        result.update(expense)
        return True


class MockAccountData:
    pass


def test_create_expense():
    # Setup
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = MockAccountData
    app.dependency_overrides[ExpenseQueries] = MockExpenseQueries
    input = {"expense_name": "test", "amount": 999, "budget_id": 96}
    expected = True

    # Enact
    response = client.post("/api/expenses", json=input)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Teardown
    app.dependency_overrides = {}
