'use strict'

import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Main from './components/Main';
import { ConnectedRouter } from 'connected-react-router';


ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)