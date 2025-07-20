import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'node:path'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'
import devConfig from './dev'
import prodConfig from './prod'
import testConfig from './test'

export default defineConfig<'webpack5'>(async (merge) => {
    const baseConfig: UserConfigExport<'webpack5'> = {
        entry: 'src/app.tsx',
        projectName: 'FastTally-taro-react',
        date: '2022-11-28',
        designWidth: 750,
        deviceRatio: {
            640: 2.34 / 2,
            750: 1,
            828: 1.81 / 2,
        },
        alias: { '@': path.resolve(__dirname, '..', 'src') },
        sourceRoot: 'src',
        outputRoot: 'dist',
        plugins: [],
        defineConstants: {},
        copy: {
            patterns: [],
            options: {},
        },
        framework: 'react',
        compiler: {
            type: 'webpack5',
            prebundle: { enable: false },
        },
        cache: {
            enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
        },
        mini: {
            // experimental: { compileMode: true },
            postcss: {
                pxtransform: {
                    enable: true,
                    config: { selectorBlackList: ['nut-'] },
                },
                url: {
                    enable: true,
                    config: {
                        limit: 750, // 设定转换尺寸上限
                    },
                },
                cssModules: {
                    enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]',
                    },
                },
            },
            miniCssExtractPluginOption: { ignoreOrder: true },
            webpackChain(chain, _webpack) {
                chain.merge({
                    plugin: {
                        install: {
                            plugin: UnifiedWebpackPluginV5,
                            args: [
                                {
                                    appType: 'taro',
                                    rem2rpx: true,
                                },
                            ],
                        },
                    },
                })
                chain.module
                    .rule('webfonts')
                    .test(/\.font\.js$/)
                    .use('MiniCssExtractPlugin.loader')
                    .loader(MiniCssExtractPlugin.loader)
                    .end()
                    .use('css-loader')
                    .loader('css-loader')
                    .options({ url: false })
                    .end()
                    .use('webfonts-loader')
                    .loader('webfonts-loader')
                    .end()
                chain.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
                    {
                        filename: 'assets/[name].[contenthash:8].css',
                    },
                ])
            },
        },
        h5: {
            publicPath: '/',
            staticDirectory: 'static',
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {},
                },
                pxtransform: {
                    enable: true,
                    config: { selectorBlackList: ['nut-'] },
                },
                cssModules: {
                    enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]',
                    },
                },
                htmltransform: {
                    enable: true,
                    // 设置成 false 表示 不去除 * 相关的选择器区块
                    // 假如开启这个配置，它会把 tailwindcss 整个 css var 的区域块直接去除掉
                    config: { removeCursorStyle: false },
                },
            },
        },
    }

    console.log('index => ', process.env.NODE_ENV)

    if (process.env.NODE_ENV === 'development') {
        return merge({}, baseConfig, devConfig)
    }
    if (process.env.NODE_DEV === 'test') {
        return merge({}, baseConfig, testConfig)
    }
    return merge({}, baseConfig, prodConfig)

    // if (process.env.NODE_ENV === 'development') {
    //     // 本地开发构建配置（不混淆压缩）
    //     return merge({}, baseConfig, devConfig)
    // }
    // // 生产构建配置（默认开启压缩混淆等）
    // return merge({}, baseConfig, prodConfig)
})
