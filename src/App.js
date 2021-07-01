import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import ExercisesListComponent from "./components/exercises-list.component.js";
import EditExerciseComponent from "./components/edit-exercise.component.js";
import CreateExerciseComponent from "./components/create-exercise.component.js";
import CreateUserComponent from "./components/create-user.componenta.js";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar/>
              <br/>
              <Route path="/" exact component={ExercisesListComponent}/>
              <Route path="/edit/:id" component={EditExerciseComponent}/>
              <Route path="/create" component={CreateExerciseComponent}/>
              <Route path="/user" component={CreateUserComponent}/>
          </div>
      </Router>
  );
}

export default App;
