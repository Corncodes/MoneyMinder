# Main FastAPI application entry point for the MoneyMinder API
# This file sets up the FastAPI app with CORS middleware and includes all routers

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, budgets, expenses
from authenticator import authenticator
import os

# Create the main FastAPI application instance
app = FastAPI()

# Include all the API routers for different resource types
# Each router handles a specific domain (accounts, budgets, expenses)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(budgets.router)
app.include_router(expenses.router)

# Configure CORS middleware to allow cross-origin requests
# This is necessary for the frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    # Allow requests from the frontend URL (defaults to localhost:3000)
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,  # Allow cookies and authentication headers
    allow_methods=[
        "*"
    ],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/api/launch-details")
def launch_details():
    """
    Endpoint that returns launch details for the application.
    This appears to be used for tracking deployment information.
    """
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
