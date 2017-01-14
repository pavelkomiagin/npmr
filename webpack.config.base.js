/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import validate from 'webpack-validator';
import {
  dependencies as externals
} from './app/package.json';

export default validate({
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.sass$/,
      loaders: [
        'style',
        'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
        'sass'
      ]
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',

    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      //react: path.resolve('./node_modules/react'),
      //'react-dom': path.resolve('./node_modules/react-dom'),
      'components': path.resolve('./app/components'),
      //'shared': path.resolve('./app/bundles/BaseApp/components/shared'),
      //'actions': path.resolve('./app/bundles/BaseApp/actions'),
      //'BaseApp': path.resolve('./app/bundles/BaseApp'),
      //'fonts': path.resolve('./fonts'),
      //'jquery': path.resolve('./node_modules/jquery'),
      //'jquery-ui/widget': './vendor/jquery.ui.widget.js'
    },
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  plugins: [],

  externals: Object.keys(externals || {})
});
