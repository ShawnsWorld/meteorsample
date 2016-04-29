import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import '../imports/startup/accounts-config.js';


import routes from './Routes';

Meteor.startup(() => {
    render(<Router  history={browserHistory} routes={routes}/>, document.getElementById('app'));
});
