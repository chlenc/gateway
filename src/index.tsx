import * as React from 'react';
import { render } from 'react-dom';

import { Provider as MobxProvider } from 'mobx-react';

import { RootStore } from '@stores';
import { createBrowserHistory } from 'history';

import './styles';
import 'antd/dist/antd.css';

import App from '@components/App';

const mobXStore = new RootStore();

const history = createBrowserHistory();


render(<MobxProvider {...mobXStore}><App history={history}/></MobxProvider>, document.getElementById('root'));


