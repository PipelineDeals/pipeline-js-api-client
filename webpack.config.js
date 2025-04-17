const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const env = process.env.NODE_ENV

const config = {
  mode: env === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    library: {
      name: 'PipelineDeals',
      type: 'umd',
      umdNamedDefine: true
    },
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new ESLintPlugin({
      files: '**/*.js',
      exclude: 'node_modules',
      useEslintrc: true,
      eslintPath: require.resolve('eslint/lib/api')
    })
  ],
  optimization: {
    minimize: env === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
          }
        }
      })
    ]
  }
}

module.exports = config
