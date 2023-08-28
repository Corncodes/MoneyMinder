export class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint, token=null) {
    if (token) {
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

  async put(endpoint, body, token=null) {
    return this._send("PUT", endpoint, body, token);
  }

  async post(endpoint, body, token=null) {
    return this._send("POST", endpoint, body, token);
  }

  async delete(endpoint, body, token=null) {
    return this._send("DELETE", endpoint, body, token);
  }

  async _send(method, endpoint, body, token) {
    if (token) {
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
