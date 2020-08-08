import React from 'react';

// Import Stores
import { authStore } from './stores/authStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Import Pages
import Home from './components/pages/Home/Home';

// Import Bootstrap Styling
import './assets/bootstrap.min.css';

// Import My Styling
import './App.scss';

const App = () => {

  return (
    <Router>

      <Provider authStore={authStore}>

        <Switch>

          <Route exact path="/" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            return <Home />
          }} />

        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
