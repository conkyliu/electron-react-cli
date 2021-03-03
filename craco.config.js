const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

/* craco.config.js */
module.exports = {
    // ...
    webpack: {
        plugins: [new AntdDayjsWebpackPlugin()],
    }
};