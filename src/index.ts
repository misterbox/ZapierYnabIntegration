const { version } = require('../package.json');
import { version as platformVersion } from 'zapier-platform-core';

import Authentication from './authentication';
import Middleware from './middleware';
import Transaction from './creates/transaction';
import Budget from './resources/budget';
import Account from './resources/account';

process.version;

const App = {
    version,
    platformVersion,

    authentication: Authentication,

    beforeRequest: [
        Middleware.addAuthHeader
    ],

    afterResponse: [],

    resources: {},

    triggers: {
        [Budget.key]: Budget,
        [Account.key]: Account
    },

    searches: {},

    creates: {
        [Transaction.key]: Transaction
    }
};

export default App;