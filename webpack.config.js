"use strict";
require('argv-set-env')();
var here = require('path-here');
var packageJson = require('./package.json');
var _ = require('lodash');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = getConfig();

function getConfig() {
    var config = getCommonConfig();

    switch (process.env.NODE_ENV) {
        case 'development':
            config = _.merge(config, getDevConfig());
            break;
        case 'production':
            config = _.merge(config, getProdConfig());
            break;
        default:
            throw new Error(`NODE_ENV not equal to development, production. It is equal to ${process.env.NODE_ENV}`);
    }
    return config;
}

function getCommonConfig() {
    return {
        context: here('.'),
        entry: './src/index.js',
        output: {
            libraryTarget: 'umd',
            library: 'ng-lang-code'
        },
        stats: {
            colors: true,
            reasons: true
        },
        externals: {
            angular: 'angular'
        }
    };
}

function getDevConfig() {
    return {
        output: {
            filename: 'dist/ngLangcode.js'
        },
        module: {
            loaders: [
                getJavaScriptLoader(),
                getHtmlLoader(),
                getCssLoader()
            ]
        },
        plugins: getCommonPlugins()
    };
}

function getProdConfig() {
    return {
        output: {
            filename: 'dist/ngLangcode.min.js'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                getJavaScriptLoader(),
                getHtmlLoader(),
                getCssLoader()
            ]
        },
        plugins: _.union(getCommonPlugins(), [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ])
    };
}

function getJavaScriptLoader() {
    return {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel?presets[]=es2015'],
        exclude: "node_modules"
    };
}

function getHtmlLoader() {
    return {
        test: /\.html$/,
        loaders: ['raw'],
        exclude: "node_modules"

    };
}

function getCssLoader() {
    return {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: "node_modules"
    };
}

function getCommonPlugins() {
    return _.filter([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify(packageJson.version)
        }),
        process.env.CI ? undefined : new WebpackNotifierPlugin({
            title: 'ngLangcode',
        })
    ]);
}