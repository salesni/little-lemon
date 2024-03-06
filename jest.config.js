module.exports = {
    // Specify the root directory for Jest
    roots: ['<rootDir>/src'],
  
    // Match test files with the .test.js extension in the test folder
    testMatch: ['<rootDir>/src/test/**/*.test.js'],
  
    // Module name mapper to resolve imports from src/components
    moduleNameMapper: {
      '^components/(.*)$': '<rootDir>/src/components/$1',
    },
  };