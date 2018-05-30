jest.autoMockOff();
const path = require('path');
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

const scriptPath = __dirname;
defineTest(scriptPath, 'index', null, 'generalTransform');
defineTest(scriptPath, 'index', null, 'deepImport');

// TODO uncomment to check internal transform
// process.env.MIGRATION = 'wix-style-react';
// defineTest(scriptPath, 'index', null, 'wsrTransform');

