module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['jest'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['_config', './src/config'],
          ['_app', './src/app'],
          ['_hooks', './src/hooks'],
          ['_components', './src/components'],
          ['_services', './src/services'],
          ['_utils', './src/utils'],
          ['_redux', './src/store'],
          ['_screens', './src/screens'],
          ['_assets', './src/assets'],
          ['_navigation', './src/navigation'],
        ],
        extensions: ['.js', '.jsx', '.json', '.css'],
      },
    },
  },
  globals: {
    JSX: true,
  },
  ignorePatterns: ['**/__tests__/*.tsx'],
  rules: {
    curly: ['error', 'multi-line'],
  },
};
