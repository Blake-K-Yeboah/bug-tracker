import React from 'react';
import './App.scss';

// Import Stores
import { authStore } from './stores/authStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'

// Import Pages
import Home from './components/pages/Home';

function App() {
  return (
    <Router>

      <Provider authStore={authStore}>

        <Switch>

          <Route exact path="/" component={Home} />

        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
