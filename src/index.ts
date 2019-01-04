const { version } = require('../package.json');
import { version as platformVersion } from 'zapier-platform-core';
import Authentication from './authentication';
import Middleware from './middleware';
import Transaction from './creates/transaction';
import Budget from './resources/budget';

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
        [Transaction.key]: Transaction,
        [Budget.key]: Budget
    },

    searches: {},

    creates: {
        [Transaction.key]: Transaction
    }
};

export default App;