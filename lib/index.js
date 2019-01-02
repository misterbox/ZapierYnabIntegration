"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { version } = require('../package.json');
const zapier_platform_core_1 = require("zapier-platform-core");
process.version;
const App = {
    version,
    platformVersion: zapier_platform_core_1.version,
    authentication: {},
    beforeRequest: [],
    afterResponse: [],
    resoures: {},
    triggers: {},
    searches: {},
    creates: {}
};
exports.default = App;
