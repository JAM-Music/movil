module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          _src: './src',
          _assets: './src/assets',
          _components: './src/components',
          _config: './src/config',
          _hooks: './src/hooks',
          _navigation: './src/navigation',
          _redux: './src/store',
          _services: './src/services',
          _utils: './src/utils',
          _screens: './src/screens',
        },
      },
    ],
  ],
};
