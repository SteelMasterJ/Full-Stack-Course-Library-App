import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//importing components
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UnhandledError from './components/UnhandledError';

// Higher order component
import withContext from './Context';

//subscribing components to context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);


function App() {
  return (
    <Router>
    <div>

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
        <Route path="/error" component={UnhandledError} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
