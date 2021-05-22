module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'semi': [
      'error',
      'never',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'no-empty': [
      'error', {
        'allowEmptyCatch': true,
      }
    ],
    // 'complexity': [
    //   'warn', {
    //     max: 4,
    //   },
    // ],
  },
}
