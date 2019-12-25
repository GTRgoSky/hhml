import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/
// 导入 webpack-chain 模块，该模块导出了一个用于创建一个webpack配置API的单一构造函数。

import Config from 'webpack-chain';
const webpackConfigP = new Config(); // 对该单一构造函数创建一个新的配置实例

const config: IConfig = {
    treeShaking: true,
    routes: [
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                {
                    path: '/toolList',
                    component: './toolList/index',
                },
                {
                    name: '工作台',
                    path: '/dashboardworkplace',
                    component: './DashboardWorkplace',
                },
                {
                    name: '目的基因搜索',
                    path: '/mdjyserch',
                    component: './MdjyComp',
                },
                {
                    path: '/',
                    // component: '../pages/index',
                    component: './DashboardWorkplace',
                },
            ],
        },
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
                dynamicImport: false,
                title: 'MDJY_project',
                dll: false,
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
            },
        ],
    ],
    chainWebpack: function(webpackConfigP: any, { webpack }) {
        // webpack.disableCSSModules = true;
        // webpackConfigP.module
        //     .rule('less')
        //     .test(/\.(css|less)$/)
        //     .use('less')
        //     .loader('style-loader')
        //     .loader(MiniCssExtractPlugin.loader)
        //     .loader('css-loader')
        //     .loader('postcss-loader')
        //     .loader('less-loader')
        //     .end()
        //     .end();
        // webpackConfigP.module
        //     .rule('css')
        //     .test(/\.(css|less)$/)
        //     .use('less')
        //     .loader(MiniCssExtractPlugin.loader)
        //     .loader('css-loader')
        //     .loader('postcss-loader')
        //     .loader('less-loader')
        //     .end()
        //     .end();
        // console.log(webpackConfigP.toString());
    },
};
export default config;
