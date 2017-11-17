/**
 * @file 使用DllPlugin把常用依赖单独打包，提高webpack打包效率
 * @author Vinci
 * 在应用到这些依赖包的后端套模板的html需要使用script标签引用output的filename的js文件
 */
var path = require('path')
const webpack = require('webpack');

const libs = [
    'react',
    'react-dom',
    'mongoid-js',
];

module.exports = {
    output: {
        path: path.join(__dirname, 'dist/lib'),
        filename: '[name]_[hash:6].js',
        library: '[name]',
    },
    entry: {
        libs,
    },
    plugins: [
        new webpack.DllPlugin({
            path: './dll/manifest.json',
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
};
