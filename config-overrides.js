const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
module.exports = {
  paths: (paths, env) => {
    // 修改打包路径和
    if (env === 'production') {
      paths.appBuild = path.resolve(paths.appBuild, 'react');
      paths.publicUrlOrPath = './';
    }
    return paths;
  },
  webpack: (config, env) => {
    // 添加 monaco editor 插件
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'json', 'xml', 'typescript'],
        features: ['find', 'format'],
        publicPath: './',
      }),
    );

    // 打包后去除 .map 文件
    if (env === 'production') {
      config.devtool = false;
    }

    // 添加 worker-loader
    config.module.rules = [
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: '[name]:[hash:8].js',
            inline: 'fallback',
          },
        },
      },
      ...config.module.rules,
    ];
    return config;
  },
};
