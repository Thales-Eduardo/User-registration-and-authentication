import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dash from '../pages/Dash';
import Forgot from '../pages/Forgot';
import ResetPassword from '../pages/ResetPassword';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/password/forgot" component={Forgot} />
    <Route path="/reset_password" component={ResetPassword} />

    <Route path="/dash" component={Dash} isPrivate />
  </Switch>
);

export default Router;
