const chai = require('chai');
const Enzyme = require('enzyme');
const { JSDOM } = require('jsdom');
const ChaiEnzyme = require('chai-enzyme');
const babelRegister = require('@babel/register');
const Adapter = require('enzyme-adapter-react-16');

// set test environment for node
process.env.NODE_ENV = 'test';

// configure enzyme addapter
Enzyme.configure({ adapter: new Adapter() });

// enhance enzyme assertions using chai library
chai.use(ChaiEnzyme());

// transpile all javascript file .js and .jsx
babelRegister();

// disable or ignore some required files
require.extensions['.scss'] = () => null;

// setup browser environment for testing
// jsdom is a good module to use
const { window, window: { document } } = new JSDOM('');
global.window = window;
global.document = document;
