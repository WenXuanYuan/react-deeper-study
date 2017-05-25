import path from 'path';

const isDebug = !process.argv.includes('--release');

const config = {

    devtool: 'eval-source-map',

    context: path.resolve(__dirname, '../..'),

    output: {
        path: path.resolve(__dirname, '../../build/public/assets'),
        publicPath: '/assets/',
        pathinfo: isDebug,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../../src'),
                ],
                options: {
                    cacheDirectory: isDebug,
                    babelrc: false,
                },
                presets: [
                    'stage-3',
                    'react',
                ],
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    // CSS Loader: https://github.com/webpack-contrib/css-loader
                    importLoaders: 1,
                    sourceMap: isDebug,
                    // Css Modules:
                    modules: true,
                    localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                    // CSS Nano: http://cssnano.co/optimisations/
                    minimize: !isDebug,
                    discardComments: isDebug ? false : { removeAll: true },
                },
            },
        ],
    },

    bail: !isDebug,
    cache: isDebug,

    stats: {
        colors: true,
        reasons: isDebug,
        hash: isDebug,
        version: isDebug,
        timings: true,
        chunks: isDebug,
        chunkModules: isDebug,
        cached: isDebug,
        cachedAssets: isDebug,
    },
};

const clientConfig = {
    ...config,
    name: 'client',
    target: 'web',
};

export default clientConfig;