const { version } = require('../package.json');
import { version as platformVersion } from 'zapier-platform-core';
import Authentication from './authentication';

process.version;

const App = {
    version,
    platformVersion,

    authentication: Authentication,

    beforeRequest: [],

    afterResponse: [],

    resources: {},

    triggers: {},

    searches: {},

    creates: {}
};

export default App;