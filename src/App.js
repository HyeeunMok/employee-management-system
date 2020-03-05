import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/UI/NavBar/NavBar';
import UserDashboard from './user/UserDashboard/UserDashboard';
import EditForm from './user/Forms/EditForm';
import AddForm from './user/Forms/AddForm';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar title="Plexxis" user="Hyeeun Mok" />
        <Route path="/" exact component={UserDashboard} />
        <Route path="/edit/:id" component={EditForm} />
        <Route path="/add" component={AddForm} />
      </div>
    </Router>
  );
}

export default App;
