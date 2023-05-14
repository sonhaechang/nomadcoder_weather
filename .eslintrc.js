module.exports = {
  root: true,
  extends: '@react-native-community',
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};