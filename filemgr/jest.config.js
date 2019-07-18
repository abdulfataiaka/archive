// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  rootDir: 'client',

  globals: {},

  // A set of global variables that need to be available in all test environments
  globals: {
    document: true
  },

  // An array of directory names to be searched recursively up from the requiring module"s location
  moduleDirectories: [
    "node_modules"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "jsx"
  ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^.*\.scss$": "identity-obj-proxy"
  },

  // An array of regexp pattern strings, matched against all module paths before considered "visible" to the module loader
  // modulePathIgnorePatterns: [],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [
    "<rootDir>/spec/support/setup/enzyme.js",
    "<rootDir>/spec/support/setup/jsdom.js"
  ],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/spec/**/*.spec.js?(x)"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/spec/support"
  ],

  transform: {
    "^.+\\.jsx?$": "babel-jest",
  }

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost"
};
