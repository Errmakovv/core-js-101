module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-plusplus': 0,
    'no-mixed-operators': 0,
    'prefer-template': 0,
    'max-len': 0,
    'no-constant-condition': 0,
    'no-loop-func': 0,
    'no-confusing-arrow': 0,
    'no-restricted-globals': 0,
    'prefer-rest-params': 0,
    'no-useless-concat': 0,
    'no-await-in-loop': 0,
  },
};
