import React from 'react';

// Import Stores
import { authStore } from './stores/authStore';
import { usersStore } from './stores/usersStore';
import { changeStore } from './stores/changeStore';
import { projectStore } from './stores/projectStore';

// Import Provider
import { Provider } from 'mobx-react';

// Import React Router Dom Stuff
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// Import Pages
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import ManageUserRoles from './components/pages/ManageUserRoles/ManageUserRoles';
import NotAllowed from './components/pages/NotAllowed/NotAllowed';
import Projects from './components/pages/Projects/Projects';

// Import Styling
import './style/App.scss';

const App = () => {

  return (
    <Router>

      <Provider authStore={authStore} usersStore={usersStore} changeStore={changeStore} projectStore={projectStore} >

        <Switch>

          <Route exact path="/" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            authStore.setError(false);
            return <Register />
          }} />

          <Route exact path="/login" render={(props) => {
            if (authStore.isAuthenticated) return <Redirect to="/dashboard" />
            authStore.setError(false);
            return <Login />
          }} />

          <Route exact path="/dashboard" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <Dashboard />
          }} />

          <Route exact path="/manage-user-roles" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            if (authStore.user.role !== 'admin' && authStore.user.role !== 'project-manager') return <NotAllowed />
            return <ManageUserRoles />
          }} />

          <Route exact path="/projects" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <Projects />
          }} />

        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
