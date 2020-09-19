import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

// Context lets you pass data through the component tree without having to pass props down manually at every level.
const Context = React.createContext(); 

// The provider is what provides the data that needs to be consumed by other components of the application.
// This class is a high-order component that returns a provider component which provides state. 
export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    coursesArray: [],
    courseDetail: [],
    authPassword: Cookies.getJSON('authPassword')
  };

  constructor() {
    super();
    this.data = new Data(); // Initialize a new instance of the Data class.
  }

  
  render() {
    const { 
      authenticatedUser,      
      coursesArray,
      courseDetail,
      authPassword
     } = this.state;

    // Value represents an object containing the context to be shared throughout the component tree.
    const value = {
      authenticatedUser,
      coursesArray,
      courseDetail,
      authPassword,
      data: this.data,
      actions: { // Stores functions for access later on.
        signIn: this.signIn,
        signOut: this.signOut,
        courseList: this.courseList,
        courseInfo: this.courseInfo,
        courseDelete: this.courseDelete,
      }
    };

    
    // The Provider is what provides the data that needs to be consumed by other components.
    // Provides the application state via a required 'value' prop.
    // Value represents an object containing the context to be shared throughout the component tree.
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Sets the state for authenticatedUser.
  signIn = async (emailAddress, password) => {
    // Returned promise value will look like {emailAddress: "emailAddress", password: "password"}.
    const user = await this.data.getUser(emailAddress, password);
    const userPassword = password;
    if(user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authPassword: userPassword 
        };
      });

      // Set a cookie.
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      Cookies.set('authPassword', userPassword, {expires: 1});
    }
    return user;
  }

  // Removes the user from the authenticatedUser state.
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('authPassword');
  }

  // Collects an array of courses.
  courseList = async () => {
    const courses = await this.data.getCourses();
    this.setState(() => {
      return {
        coursesArray: courses,
      };
    });
    return courses;
  }
  // Collects specific course information.
  courseInfo = async (id) => {
    const course = await this.data.getCourse(id);
    this.setState(() => {
      if(Object.keys(course).length === 0) {
        window.location.replace('/notfound')
      } else {
        return {
          courseDetail: {
            userId: course.course.userId,
            id: course.course.id,
            title: course.course.title,
            description: course.course.description,
            estimatedTime: course.course.estimatedTime,
            materialsNeeded: course.course.materialsNeeded,
            firstName: course.course.user.firstName,
            lastName: course.course.user.lastName,
            emailAddress: course.course.user.emailAddress
          }
        };
      }
    });
    return course;    
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

// withContext automatically connects the component passed to it to all actions and context changes
export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }