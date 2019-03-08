module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  testRegex: '/client/tests/.*.jsx?$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$':
      '<rootDir>/client/tests/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/client/tests/__mocks__/styleMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['/factory/', '/__mocks__/'],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
};

