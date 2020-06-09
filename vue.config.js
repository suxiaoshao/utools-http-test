const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
    publicPath: './',
    productionSourceMap: false,
    outputDir: './build/vue',
    devServer: {
        port: 8084
    },
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: true
        }
    },
    transpileDependencies: [
        'quasar'
    ],
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin({
                languages: ['javascript', 'css', 'html', 'typescript', 'json']
            })
        ]
    }
}
