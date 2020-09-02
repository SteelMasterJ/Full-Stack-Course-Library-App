import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//importing components
import Courses from './components/Courses';
import UnhandledError from './components/UnhandledError';

// Higher order component
import withContext from './Context';

//subscribing components to context
const CoursesWithContext = withContext(Courses);


function App() {
  return (
    <Router>
    <div>

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/error" component={UnhandledError} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
