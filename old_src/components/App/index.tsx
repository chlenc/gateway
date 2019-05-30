import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
// import DevTools from 'mobx-react-devtools';

import Root from '@components/Root';
import NotFound from '@components/NotFound';

interface IProps {}

class App extends Component<IProps> {
  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path={['/']}
          component={Root}
        />

        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default App;
