import React from 'react';

// Import Stores
import { authStore } from './stores/authStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Import Pages
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';

// Import Styling
import './style/App.scss';


const App = () => {

  return (
    <Router>

      <Provider authStore={authStore}>

        <Switch>

          <Route exact path="/" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            return <Register />
          }} />

          <Route exact path="/login" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            return <Login />
          }} />

        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
