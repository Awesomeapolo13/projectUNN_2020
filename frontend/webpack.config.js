'use strict'

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'development',
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: { //Добавляем загрузчики, он необходимы для чтения разных форматов файлов
      rules: [ // Массив объектов
          // { // для стилей в тэге style
          //     test: /\.css$/, // Все файлы которые заканчиваются на .css будут обработаны этим лоадером
          //     use: [ // Массив строк или объектов
          //       'style-loader',
          //         'css-loader', // Важен порядок, лоадеры отрабатываются начиная с последнего
          //     ],
          // },
          // для стилей с отдельным файлом
          {
              test: /\.css$/i,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          publicPath: './',
                          esModule: true,
                      }
                  },

                  'css-loader',
              ]
          },
          {
              test: /\.(png|jpe?g|gif)$/i,
              use:[
                  {
                      loader: 'file-loader',
                      options: {
                          outputPath: 'images',
                          name: '[name].[ext]', // ext - расширение (любое)
                      }
                  }
              ]
          },
          {
              test: /\.jsx?$/i,
              exclude: /node-modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets:['@babel/preset-env', '@babel/preset-react']
                  }
              },
          }
      ],
    },
    plugins: [
        new CleanWebpackPlugin({ // Создаем класс этого плагина
            cleanStaleWebpackAssets : false,
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'), // Указываем директорию, которую будем очищать
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'), //Шаблон страницы
            filename: 'index.html' // Как будет называться файл, который окажется в папке dist
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',

        }),
        new BrowserSyncWebpackPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./dist'] }
        })
    ],
    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    }
};
