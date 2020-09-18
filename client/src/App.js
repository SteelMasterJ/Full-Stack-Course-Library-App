import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

//importing components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UnhandledError from './components/UnhandledError';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

// Higher order component
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

//subscribing components to context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);


function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/error" component={UnhandledError} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
  </Router>
  );
}

export default App;
