import { Route, Router, Switch } from 'react-router-dom';

import ROUTES from 'config/routes';
import history from 'config/history';
import AuthorizedLayout from '../common/AuthorizedLayout';
import Login from '../Login';
import Register from '../Register';
import Todos from '../Todos';

const APP_ROUTES = {
  PUBLIC: [
    {
      path: ROUTES.LOGIN,
      component: Login,
      exact: true,
    },
    {
      path: ROUTES.REGISTER,
      component: Register,
      exact: true,
    },
  ],
  PRIVATE: [
    {
      path: ROUTES.HOME,
      component: Todos,
      exact: true,
    },
  ],
};

const App = () => {
  const renderRoute = (route, idx) => (
    <Route exact={route.exact} key={idx.toString()} path={route.path} component={route.component} />
  );

  const renderPrivateRoute = (route, idx) => (
    <Route exact={route.exact} key={idx.toString()} path={route.path}>
      <AuthorizedLayout>
        <route.component />
      </AuthorizedLayout>
    </Route>
  );

  return (
    <Router history={history}>
      <Switch>
        { APP_ROUTES.PRIVATE.map(renderPrivateRoute) }
        { APP_ROUTES.PUBLIC.map(renderRoute) }
      </Switch>
    </Router>
  );
};

export default App;
