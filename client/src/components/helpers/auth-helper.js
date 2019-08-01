export default class A {

  getJwt() {
    return localStorage.getItem('jwt');
  }

  setJwt(jwt) {
    localStorage.setItem('jwt', jwt);
  }

  login = (username, password) => {
    // Get a token from api server using the fetch api
    return this.fetch(`/log-in`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.getJwt(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = this.getJwt();
    console.log("Recieved answer!");
    return answer;
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getJwt(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = token => {
    try {
      const decoded = token;
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.log("expired check failed! Line 42: AuthService.js");
      return false;
    }
  };

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getJwt();
    }
    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  };

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };

};