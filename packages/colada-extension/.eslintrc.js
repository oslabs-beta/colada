module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'globals' : {
    'chrome' : 'readonly'
  },
  'ignorePatterns' : ['dist/'],
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'unix'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'always'
    ]
  }
};
