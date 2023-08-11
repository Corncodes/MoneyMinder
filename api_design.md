### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "email": "string",
        "first_name": "string",
        "last_name": "string",
      },
      "token": "string"
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Create Account

* Endpoint path: api/accounts/
* Endpoint method: POST
* Request shape (JSON):
    {
        "email": "string",
        "password": "string",
        "first_name": "string",
        "last_name": "string",
    }
* Response: success message
* Response shape (JSON):
    { "message": "Success!" }

* Response: failure message
* Response shape (JSON):
    { "message": "Unable to create user." }

* Response: email already in use message
* Response shape (JSON):
    { "message": "Email already in use." }


### Delete Account

* Endpoint path: api/accounts/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: success message
* Response shape (JSON):
    { "message": "Your account has been deleted :(" }


### Create Budget

* Endpoint path: api/budgets/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
        "name": "string",
        "monthly_income": "string",
        "expenses": [
            { 
                "expense_name": "string",
                "expense_amount": "int"
            },
        ]
    }

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    {
        "id": int,
        "name": "string",
        "monthly_income": "string",
        "expenses": [
            { 
                "expense_name": "string",
                "expense_amount": "int"
            }
        ],
        "monthly_balance": int
    }


### View Budget

* Endpoint path: api/budgets/<id>/
* Endpoint method: GET
* Query parameters:
  * id: <int>

* Headers:
  * Authorization: Bearer token
  
* Response: View Budget
* Response shape (JSON):
    {
        "id": int,
        "name": "string",
        "monthly_income": "string",
        "expenses": [
            { 
                "expense_name": "string",
                "expense_amount": "int"
            }
        ],
        "monthly_balance": int
    }


### Edit Budget

* Endpoint path: api/budgets/<id>/
* Endpoint method: PUT
* Query parameters:
  * id: <int>

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    {
        "id": int,
        "name": "string",
        "monthly_income": "string",
        "expenses": [
            { 
                "expense_name": "string",
                "expense_amount": "int"
            }
        ],
        "monthly_balance": int
    }

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    {
        "id": int,
        "name": "string",
        "monthly_income": "string",
        "expenses": [
            { 
                "expense_name": "string",
                "expense_amount": "int"
            }
        ],
        "monthly_balance": int
    }


### Delete Budget

* Endpoint path: api/budgets/<id>/
* Endpoint method: DELETE
* Query parameters:
  * id: <int>

* Headers:
  * Authorization: Bearer token

* Response: success message
* Response shape (JSON):
    { "message": "Your budget has been deleted :(" }


### «Human-readable of the endpoint»

* Endpoint path: «path to use»
* Endpoint method: «HTTP method»
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

