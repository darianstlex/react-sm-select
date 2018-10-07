module.exports = {
  cacheDirectory: 'node_modules/.jest-cache',
  setupFiles: [
    '<rootDir>/config/enzymeConfiguration.js',
  ],
  testMatch: [
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: [
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
};
