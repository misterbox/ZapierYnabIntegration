const { version } = require('../package.json');
import { version as platformVersion } from 'zapier-platform-core';
import Authentication from './authentication';
import Middleware from './middleware';

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

    triggers: {},

    searches: {},

    creates: {}
};

export default App;