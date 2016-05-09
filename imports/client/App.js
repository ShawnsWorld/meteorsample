import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Widget from './widget';

const routes = {
    path: '/',
    indexRoute: { component: Widget }
}

export default function App() {
    render(<Router  history={browserHistory} routes={routes}/>, document.getElementById('app'));
}
