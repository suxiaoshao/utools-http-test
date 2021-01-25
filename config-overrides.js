const fs = require('fs');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
module.exports = {
  paths: (paths, env) => {
    if (env === 'production') {
      paths.appBuild = path.resolve(paths.appBuild, 'react');
      paths.publicUrlOrPath = './';
    }
    return paths;
  },
  webpack: (config, env) => {
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'json', 'xml', 'typescript'],
        features: ['find', 'format'],
        publicPath: './',
      }),
    );
    if (env === 'production') {
      config.devtool = false;
    }
    return config;
  },
};
