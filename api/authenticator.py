# Authentication module for the MoneyMinder API
# This file handles user authentication using the jwtdown library
# It provides JWT token-based authentication with password hashing

import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models.accounts import AccountOut, AccountOutWithPassword


class MyAuthenticator(Authenticator):
    """
    Custom authenticator class that extends the jwtdown Authenticator.
    This class provides the specific implementation for user authentication
    in the MoneyMinder application.
    """

    async def get_account_data(
        self,
        email: str,
        accounts: AccountQueries,
    ):
        """
        Retrieve account data from the database using the provided email.
        This method is called during login to fetch user account information.

        Args:
            email: The user's email address
            accounts: AccountQueries instance for database operations

        Returns:
            AccountOutWithPassword object or None if account not found
        """
        # Use your repo to get the account based on the
        # email (which could be an email)
        return accounts.get_account(email)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        """
        Return the accounts query object for dependency injection.
        This allows the authenticator to access account data throughout the app.

        Returns:
            AccountQueries instance for database operations
        """
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        """
        Extract the hashed password from the account object.
        This is used during login verification.

        Args:
            account: AccountOutWithPassword object containing user data

        Returns:
            The hashed password string
        """
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        """
        Prepare account data for JWT cookie creation.
        This method must return exactly two values: username and account data.

        Args:
            account: AccountOut object containing user data

        Returns:
            Tuple of (email, account_data) for JWT cookie creation
        """
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.email, AccountOut(**account.dict())


# Create the authenticator instance with the signing key from environment
# The signing key is used to sign and verify JWT tokens
authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
