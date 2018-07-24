const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'no-unused-vars': OFF,
    'import/no-unresolved': OFF,
    'no-shadow': OFF,
    'react/prop-types': OFF,
    'react/prefer-stateless-function': OFF
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    worker: true,
    serviceworker: true
  }
}
