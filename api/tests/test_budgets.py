# BEGIN Will's GET and POST budget unit tests
from fastapi.testclient import TestClient
from main import app
from queries.budgets import BudgetQueries
from authenticator import authenticator


client = TestClient(app)


class MockBudgetQueries:
    def get_budgets(self, account_id):
        return []


    def create_budget(self, budget, account_id):
        result = {
          "id": 1,
          "name": "name",
          "primary_budget": True,
          "complete": False,
          "monthly_income": 0,
          "monthly_spending_total": None,
          "monthly_balance": None,
          "account_id": 1,
          "expenses": []
        }
        print(result)
        result.update(budget)
        return result


class MockTokenDict:
    def get(self, id):
        return None


def test_get_all_budgets():
    # Setup
    app.dependency_overrides[authenticator.get_current_account_data] = MockTokenDict
    app.dependency_overrides[BudgetQueries] = MockBudgetQueries

    # Enact
    response = client.get("/api/budgets")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"budgets": []}

    # Teardown
    app.dependancy_overrides = {}


def test_create_budget():
    # Setup
    app.dependency_overrides[authenticator.get_current_account_data] = MockTokenDict
    app.dependency_overrides[BudgetQueries] = MockBudgetQueries
    json = {
      "name": "Unit Test",
      "monthly_income": 10000
    }

    expected = {
          "id": 1,
          "name": "Unit Test",
          "primary_budget": True,
          "complete": False,
          "monthly_income": 10000,
          "monthly_spending_total": None,
          "monthly_balance": None,
          "account_id": 1,
          "expenses": []
        }

    # Enact
    response = client.post("/api/budgets", json=json)

    # Assert
    assert response.status_code == 200
    assert response.json() == expected

    # Teardown
    app.dependancy_overrides = {}
# END Will's GET and POST budget unit tests
