module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Remove o token `import.meta` (usado por zustand/middleware via
      // `import.meta.env`), que quebra o bundle web do Metro com
      // "Cannot use 'import.meta' outside a module". Ver o arquivo do plugin.
      './babel-plugins/import-meta-empty.js',
      'react-native-worklets/plugin',
    ],
  };
};
