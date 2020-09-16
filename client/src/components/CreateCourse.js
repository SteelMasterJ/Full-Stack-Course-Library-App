import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: this.props.context.authenticatedUser.authUser.id,
    errors: [],
  }

  render() {
    const {
      errors,
    } = this.state;

    return (
        <div className="bounds course--detail">
            <h1 className="white-text">Create Course</h1>
            <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
            <div>
            
                <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-title course--title--input"
                        placeholder="Course title..."
                        onChange={this.change}
                    />
                    </div>
                </div>
                <div className="course--description">
                    <div>
                    <textarea
                        id="description"
                        name="description"
                        className=""
                        placeholder="Course description..."
                        onChange={this.change}
                    />
                    </div>
                </div>
                </div>
                <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            onChange={this.change}
                        />
                        </div>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            className=""
                            placeholder="List materials..."
                            onChange={this.change}
                        />
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            )} />
        </div> 
    );
  }

  // Allows change in the input values.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // On submit create a course.
  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser.authUser.emailAddress;
    const authPassword = context.authPassword;

    
    // Destructure and unpack properties from the state object.
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    // New user payload that will be passed to the createCourse() method.
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    // CreateCourse() is an asynchronous operation that returns a promise.
    context.data.createCourse(courseBody, authUser, authPassword)
    .then(errors => {
      console.log(errors)
      if(errors.length) { //Handles sign up issues ex. empty array
        this.setState({errors});
      } else {
        this.props.history.push('/');
      }
    })
    .catch (err => {
      console.log(err); // Handle rejected promises
      this.props.history.push('/error'); //Push to history stack.
    })
  }

  cancel = () => {
      this.props.history.push('/');
  }
}