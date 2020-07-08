'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const routes = require('../src/routes')

const poststylus = require('poststylus')
const pxtorem = require('postcss-pxtorem')
const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

function entries () {
    var entries = {}
    for (let key in routes) {
        entries[routes[key].view] = process.env.NODE_ENV === 'production'
            ? `./entry/entries/${routes[key].view}.js`
            : './entry/dev.js'
    }
    return entries
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: entries(),
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '~': path.join(__dirname, '..')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            }] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), /node_modules\/mand-mobile/]
            },
            {
                test: /\.styl$/,
                use: [
                    'css-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            import: ['theme.custom.styl']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: 'assets/imgs/[name]-[hash:10].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            require('ts-import-plugin')({
                                'libraryName': 'mand-mobile'
                            })
                        ]
                    })
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    // pxtorem (配置可根据项目需要而定)
                    use: [poststylus(pxtorem({ rootValue: 100, minPixelValue: 2, propWhiteList: [] }))]
                }
            }
        })
    ]
}
