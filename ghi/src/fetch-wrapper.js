// HTTP request wrapper utility for the MoneyMinder React application
// This class provides a simplified interface for making API calls to the backend
// Handles authentication tokens and error handling consistently

export class FetchWrapper {
  /**
   * Create a new FetchWrapper instance
   * 
   * @param {string} baseURL - The base URL for all API requests
   */
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Make a GET request to the API
   * 
   * @param {string} endpoint - The API endpoint to call
   * @param {string|null} token - Optional authentication token
   * @returns {Promise<Object>} The response data
   */
  async get(endpoint, token=null) {
    if (token) {
      // Make authenticated request with Bearer token
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Response not "OK" in GET with token');
        }
      } catch (error) {
        console.error("error", error);
      }
    } else {
      // Make unauthenticated request
      try {
        const response = await fetch(this.baseURL + endpoint);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Response not "OK" in get without token');
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  }

  /**
   * Make a PUT request to the API
   * 
   * @param {string} endpoint - The API endpoint to call
   * @param {Object} body - The request body data
   * @param {string|null} token - Optional authentication token
   * @returns {Promise<Object>} The response data
   */
  async put(endpoint, body, token=null) {
    return this._send("PUT", endpoint, token, body);
  }

  /**
   * Make a POST request to the API
   * 
   * @param {string} endpoint - The API endpoint to call
   * @param {Object} body - The request body data
   * @param {string|null} token - Optional authentication token
   * @returns {Promise<Object>} The response data
   */
  async post(endpoint, body, token=null) {
    return this._send("POST", endpoint, token, body);
  }

  /**
   * Make a DELETE request to the API
   * 
   * @param {string} endpoint - The API endpoint to call
   * @param {string|null} token - Optional authentication token
   * @returns {Promise<Object>} The response data
   */
  async delete(endpoint, token=null) {
    return this._send("DELETE", endpoint, token);
  }

  /**
   * Internal method to handle all HTTP requests
   * 
   * @param {string} method - The HTTP method (GET, POST, PUT, DELETE)
   * @param {string} endpoint - The API endpoint to call
   * @param {string|null} token - Optional authentication token
   * @param {Object|null} body - Optional request body data
   * @returns {Promise<Object>} The response data
   */
  async _send(method, endpoint, token, body) {
    if (token) {
      // Make authenticated request with Bearer token
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Response not "OK"');
        }
      } catch (error) {
        console.error("error", error);
      }
    } else {
      // Make unauthenticated request
      try {
        const response = await fetch(this.baseURL + endpoint, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Response not "OK"');
        }
      } catch (error) {
        console.error("error", error);
      }
    }
  }
}
