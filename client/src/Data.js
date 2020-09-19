import config from './config';

export default class Data {
  // Used to make the requests to the REST API.
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      const url = config.apiBaseUrl + path;

      // Configuration object that lets you control a number of different settings.
      // Sends a request with the HTTP method along with request headers and a stringified body.
      const options = {
          method,
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
          },
      };

      if(body !== null) {
          options.body = JSON.stringify(body);
      }

      // Check if auth is required.
      if(requiresAuth) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }

      return fetch(url, options);
  }

   // Makes a GET request to courses.
   async getCourses() {
    const response = await this.api('/courses', 'GET')
    if(response.status === 200) {
      return response.json().then(data => data)
    } else {
      window.location.replace('/error')
    }
  }

  // Makes a GET request to the /users endpoint, and returns a JSON object.
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // Makes a POST request, sending the new user data to the /users endpoint.
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  // Makes a GET request to course information.
  async getCourse(id) {
    const response = await this.api('/courses/' + id, 'GET')
    if(response.status === 200) {
      return response.json().then(data => data)
    } else {
      window.location.replace('/notfound')
    }
  }

  // Makes a DELETE request to delete a course.
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api('/courses/' + id, 'DELETE', null, true, { emailAddress, password })
    if(response.status !== 204) {
      window.location.replace('/error')
    }
  }

  // Makes an PUT request to update a course. 
  async updateCourse(id, courseEdits, emailAddress, password) {
    const response = await this.api('/courses/' + id, 'PUT', courseEdits, true, { emailAddress, password })
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      window.location.replace('/error')
    }
  }

  // Makes a POST request to create a course. 
  async createCourse(courseInfo, emailAddress, password) {
    const response = await this.api('/courses', 'POST', courseInfo, true, { emailAddress, password })
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      window.location.replace('/error')
    }
  }
}