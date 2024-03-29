const path = require('path');

const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');



/** CONSTANTS */
const BUILD_DIRECTORY = process.env.PLURID_BUILD_DIRECTORY || 'distribution';

const isProduction = process.env.ENV_MODE === 'production';

const entryIndex = path.resolve(__dirname, '../../../source/objects/Dashboard/server/client/index.tsx');
const outputPath = path.resolve(__dirname, `../../../${BUILD_DIRECTORY}/dashboard/client`);

const styledComponentsTransformer = createStyledComponentsTransformer({
    ssr: true,
    displayName: !isProduction,
});


/** PLUGINS */
const copyPlugin = new CopyPlugin({
    patterns: [
        {
            from: path.resolve(__dirname, '../../../source/objects/Dashboard/server/public'),
            to: './',
        },
    ],
});

const compressionPluginBrotli = new CompressionPlugin({
    include: 'vendor.js',
    filename: 'vendor.js.br',
    algorithm: 'brotliCompress',
    compressionOptions: { level: 11 },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
});
const compressionPluginGzip = new CompressionPlugin({
    include: 'vendor.js',
    // filename: 'vendor.js.gzip',
});

const processEnvironmentPlugin = new webpack.DefinePlugin({
    'process.env.ENV_MODE': JSON.stringify(process.env.ENV_MODE),
    'process.env.SC_DISABLE_SPEEDY': true, /** HACK: styled components not rendering in production */

    'process.env.JOINER_ENDPOINT_GRAPHQL': JSON.stringify(process.env.JOINER_ENDPOINT_GRAPHQL),
    'process.env.NODE_ENV': JSON.stringify(true),
});


const plugins = {
    copyPlugin,
    compressionPluginBrotli,
    compressionPluginGzip,
    processEnvironmentPlugin,
};



/** RULES */
const styleRule = {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
    ],
};


const fileRule = {
    test: /\.(jpe?g|gif|png|svg|eof|otf|woff|ttf|wav|mp3|pdf|mov|mp4)$/i,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '/assets/[name].[ext]',
            },
        },
    ],
};


const tsRule = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'ts-loader',
            options: {
                configFile: path.resolve(__dirname, '../../../tsconfig.json'),
                getCustomTransformers: () => ({
                    before: [styledComponentsTransformer]
                }),
            },
        },
    ],
};


const rules = {
    styleRule,
    fileRule,
    tsRule,
};



/** CONFIGURATION */
const baseConfig = {
    entry: {
        index: entryIndex,
    },

    output: {
        filename: '[name].js',
        path: outputPath,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],

        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../../../tsconfig.json'),
            }),
        ],

        alias: {
            crypto: false,
        },
    },

    stats: {
        modules: false,
        chunks: false,
        assets: false,
    },

    module: {
        rules: [
            rules.styleRule,
            rules.fileRule,
            rules.tsRule,
        ],
    },
};



module.exports = {
    plugins,
    rules,
    baseConfig,
};
