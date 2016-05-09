import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import '../imports/startup/accounts-config.js';

import App from '../imports/client/App';


import routes from './Routes';

Meteor.startup(() => {
    App();
});
