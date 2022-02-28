import path from 'path'
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack'


const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js', publicPath: '/dist/'
    },
    module: {
        rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] }]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin()
    ],
    resolve: { alias: { 'react-dom': '@hot-loader/react-dom' } }
}

export default config