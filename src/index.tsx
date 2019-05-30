import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import { Provider as MobxProvider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

import { RootStore } from '@stores';
import App from '@components/App';
import MobxIntlProvider from './providers/MobxIntlProvider';

import 'antd/dist/antd.css';
import './styles';

const bugsnagClient = bugsnag('226bc58f96dd9c509841b12cb9de3b54');
bugsnagClient.use(bugsnagReact, React);

// wrap your entire app tree in the ErrorBoundary provided
const ErrorBoundary = bugsnagClient.getPlugin('react');

const browserHistory = createBrowserHistory();

const mobXStore = new RootStore();


const history = syncHistoryWithStore(browserHistory, mobXStore.routerStore);

render(
  <MobxProvider {...mobXStore}>
    <MobxIntlProvider>
      <Router history={history}>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </Router>
    </MobxIntlProvider>
  </MobxProvider>,
  document.getElementById('root')
);
