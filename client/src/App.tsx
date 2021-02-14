import React from 'react';

// Import Stores
import { authStore } from './stores/authStore';
import { usersStore } from './stores/usersStore';
import { changeStore } from './stores/changeStore';
import { projectStore } from './stores/projectStore';
import { commentStore } from './stores/commentStore';
import { ticketStore } from './stores/ticketStore';

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
import NewProject from './components/pages/NewProject/NewProject';
import UserProfile from './components/pages/UserProfile/UserProfile';
import ProjectPage from './components/pages/ProjectPage/ProjectPage';
import EditProject from './components/pages/EditProject/EditProject';
import EditProfile from './components/pages/EditProfile/EditProfile';
import TransferOwner from './components/pages/TransferOwner/TransferOwner';
import ManageProjectsUsers from './components/pages/ManageProjectsUsers/ManageProjectsUsers';
import ManageProjectUsers from './components/pages/ManageProjectUsers/ManageProjectUsers';
import History from './components/pages/History/History';
import Tickets from './components/pages/Tickets/Tickets';
import TicketPage from './components/pages/TicketPage/TicketPage';
import NewTicket from './components/pages/NewTicket/NewTicket';
import NotFound from './components/pages/NotFound/NotFound';
import EditTicket from './components/pages/EditTicket/EditTicket';

// Import Styling
import './style/App.scss';


const App = () => {
  
  return (
    <Router>

      <Provider authStore={authStore} usersStore={usersStore} changeStore={changeStore} projectStore={projectStore} commentStore={commentStore} ticketStore={ticketStore}>

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

          <Route exact path="/projects/new" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <NewProject />
          }} />

          <Route exact path="/profile/:id" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <UserProfile {...props} />
          }} />

          <Route exact path="/profile/:id/edit" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <EditProfile {...props} />
          }} />

          <Route exact path="/project/:id" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <ProjectPage {...props} />
          }} />

          <Route exact path="/project/:id/edit" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <EditProject {...props} />
          }} />

          <Route exact path="/project/:id/transfer-owner" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <TransferOwner {...props} />
          }} />

          <Route exact path="/manage-projects-users" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <ManageProjectsUsers {...props} />
          }} />

          <Route exact path="/manage-projects-users/:id" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <ManageProjectUsers {...props} />
          }} />

          <Route exact path="/history" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <History {...props} />
          }} />

          <Route exact path="/tickets" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <Tickets {...props} />
          }} />

          <Route exact path="/tickets/new" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <NewTicket {...props} />
          }} />

          <Route exact path="/ticket/:id" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <TicketPage {...props} />
          }} />

          <Route exact path="/ticket/:id/edit" render={(props) => {
            if (!authStore.isAuthenticated) return <Redirect to="/login" />
            return <EditTicket {...props} />
          }} />

          <Route component={NotFound} />
          
        </Switch>

      </Provider>

    </Router>
  );
}

export default App;
