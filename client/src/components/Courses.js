import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {
  state = {
    results: []
  }

  componentDidMount() {
    this.loadCourses();
  }

  // Collect targetted course information.
  loadCourses = () => {
    this.props.context.actions.courseList()
    .then(response => {
      this.setState({
        results: response
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    })
  };

  render() {
    const { results } = this.state;
    console.log(this.props)
    // Scans through array and displays each course.
    let courses = results.map(course => 
      <div className="grid-33" key={course.id}>
        <Link className="course--module course--link" to={{pathname: `/courses/${course.id}`}}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      </div>
    );
    
    // Displays a button to redirect to /courses/create.
    let createCourse = (
      <Link className="course--module course--add--module" to="/courses/create">
        <h3 className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
          </svg>
          New Course
        </h3>
      </Link>
    );
  
  
    return (
      <div id="root">
        <div>
          <hr />
          <div className="bounds">
            {courses}
            <div className="grid-33">
              {createCourse}
            </div>
          </div>
        </div>
      </div>
    );
  }
}