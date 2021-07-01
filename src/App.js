import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import UsersComponent from "./components/users.component.js";
import ConnectorsComponent from "./components/connectors.component";
import SubscriptionsComponent from "./components/subscriptions.component";

function App() {
  return (
      <Router>
          <div className="container" >
              <Navbar/>
              <br/>
              <Route path="/users" component={UsersComponent}/>
              <Route path="/connectors" component={ConnectorsComponent}/>
              <Route path="/subscriptions" component={SubscriptionsComponent}/>
          </div>
      </Router>
  );
}

export default App;
