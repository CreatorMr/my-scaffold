const express = require('express')

const webpack = require('webpack')
// const merge = require('merge')
const middle = require('webpack-dev-middleware')
let HTMLWebpackPlugin = require('html-webpack-plugin');

const path = require('path')

module.exports = async function startServe(configImport) {
    console.log("执行myscff.dev.js")
    console.log(__dirname)
    console.log(process.cwd())
    const app = new express();
    const config1 = {
        mode: 'development',
        entry: {
            index: path.resolve(__dirname,'./dev/index.js'),
        },
        output: {
            filename: 'ikolp.js',
            path: path.resolve(__dirname, './dist')
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname,'./dev/index.html'),
                filename: 'index.html'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        }
                    }
                }
            ]
        }
    }
    // webpack(config1,(err, stats) => {
    //     console.log('>>>><<<><><><><><><><><><><><>')
    //     console.log(stats)
    //     console.log(err)
    //     if (err || stats.hasErrors()) {
    //       // 在这里处理错误
    //     }
    //     // 处理完成
    //   })
    const compiler = webpack(config1)
    console.log("--------------")
    console.log(compiler)
    app.use(middle(compiler,{
        publicPath: config1.output.publicPath,
    }))

    app.listen(configImport.port)
}

