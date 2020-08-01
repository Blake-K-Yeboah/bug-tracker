import React from 'react';
import './App.scss';

// Import Stores
import { authStore } from './stores/authStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Import Pages
import Home from './components/pages/Home/Home';

function App() {
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
