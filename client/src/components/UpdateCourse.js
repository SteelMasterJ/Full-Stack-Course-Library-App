import React, { Component } from 'react';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  componentDidMount() {
    const { context, match }= this.props;
        const course = match.params.id;
        console.log(context.authenticatedUser[0].id);
        context.data.getCourse(course)
        .then((data) => {
            console.log(data);
            if (data === 'Course not found.'){
                this.props.history.push('/notfound')
            } else if (data.user.id === context.authenticatedUser[0].id){
                this.setState({ 
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    estimatedTime: data.estimatedTime,
                    materialsNeeded: data.materialsNeeded,
                    owner: data.User
                })
            }
            else { 
               this.props.history.push('/forbidden')
            }
        })
        .catch(err => {
            console.log('Error fetching and parsing results', err);
            this.props.history.push('/error');
        })
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    

    return (
        <div className="bounds course--detail">
            <h1 className="white-text">Update Course</h1>
            <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
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
                        defaultValue={title}
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
                        defaultValue={description}
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
                            defaultValue={estimatedTime}
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
                            defaultValue={materialsNeeded}
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

    console.log('name:' + name + 'value:' + value)

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // On submit update course.
  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser[0].emailAddress;
    const authPassword = context.authPassword;
    const courseId = this.props.match.params.id;

    // console.log(this.props)

    
    // Destructure and unpack properties from the state object.
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // New user payload that will be passed to the updateCourse() method
    const courseBody = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    // console.log(courseBody)

    // updateCourse() is an asynchronous operation that returns a promise.
    context.data.updateCourse(courseId, courseBody, authUser, authPassword)
    .then(errors => {
      if(errors.length) { //handles sign up issues ex. empty array
        this.setState({errors});
      } else {
        this.props.history.push('/');
      }
    })
    .catch (err => {
      console.log(err); // handle rejected promises
      this.props.history.push('/error'); //push to history stack
    })
  }

  cancel = () => {
    const courseId = this.props.match.params.id;
    this.props.history.push('/courses/' + courseId);
  }
}