/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Provider, onError } from 'mobx-react';
import { Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteWithSubRoutes from 'components/RouteWithSubRoutes';
import stores from 'stores';
import routes from './routes';

onError((error) => {
  console.error(error);
});

class App extends React.PureComponent {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
