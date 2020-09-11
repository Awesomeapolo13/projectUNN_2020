'use strict'

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user';

export default function(history) {
    return combineReducers({
        user: userReducer,
        router: connectRouter(history),
    })
}