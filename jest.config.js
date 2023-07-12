module.exports = {
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'jsx'],
    testMatch: ['<rootDir>/src/**/*.test.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    }
  };
  