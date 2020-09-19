import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactMarkdown from "react-markdown";


export default class CourseDetail extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: '',
    author: ''
  };

  componentDidMount() {
    const { context, match }= this.props;
        const course = match.params.id;
        context.data.getCourse(course)
        .then((data) => {
            if (data === 'Course not found.'){
                this.props.history.push('/notfound')
            } else {    
                this.setState({ 
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    estimatedTime: data.estimatedTime,
                    materialsNeeded: data.materialsNeeded,
                    userId: data.user.id,
                    author: data.user,
                    emailAddress: data.user.emailAddress
            })
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
      //userId,
      author
    } = this.state;

    let courseSettings;
    let authUser = {  
      id: []
    };
    const ownerId = this.state.userId;
    
    
    if(this.props.context.authenticatedUser !== null) {
      authUser = this.props.context.authenticatedUser[0];
    }  

    // Checks if the course's user matches the user currently authenticated.
      if(authUser.id === ownerId) {
        courseSettings = (
          <>
            <Link className="button" to={{pathname: `/courses/${this.props.match.params.id}/update`}}>Update Course</Link>
            <button className="button" onClick={this.submit} href=''>Delete Course</button>
          </>
        );
      } 

    return (
      <div>
          <div id="root">
            <div>
              </div>
              <div>
                <div className="actions--bar">
                  <div className="bounds">
                    <div className="grid-100">
                    <form onSubmit={this.delete}>
                        <span>
                          {courseSettings}
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </form>
                    </div>
                  </div>
                </div>
                <div className="bounds course--detail">
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <h3 className="course--title">{title}</h3>
                      <p>By {author.firstName} {author.lastName}</p>
                    </div>
                    <div className="course--description">
                      <ReactMarkdown source={description} />
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          <h4 >Estimated Time</h4>
                          <h3 className="white-text">{estimatedTime}</h3>
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <div>
                            <ReactMarkdown className="white-text" source={materialsNeeded} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
  }
  delete =()=>{
    // Retrieve USER context and Course ID
    const { context } = this.props;
    const id = this.state.id;

    // Pass above info to API and return USER to Main Page
    context.data.deleteCourse(id, this.props.context.authenticatedUser[0].emailAddress, this.props.context.authPassword)
    .then(
        this.props.history.push('/deleted')
    )  
    .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
    })
} 
}