import React from 'react';

// Import Stores
import { authStore } from './stores/authStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Import Pages

// Import Styling
import './App.scss';

const App = () => {

  return (
    <Router>

      <Provider authStore={authStore}>

        <Switch>

          <Route exact path="/" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            return <h1>Home</h1>
          }} />

        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
