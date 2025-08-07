/** @type {import('tailwindcss').Config} */
module.exports = {
    // 这里给出了一份 taro 通用示例，具体要根据你自己项目的目录结构进行配置
    // 比如你使用 vue3 项目，你就需要把 vue 这个格式也包括进来
    // 不在 content glob表达式中包括的文件，在里面编写tailwindcss class，是不会生成对应的css工具类的
    content: ['./src/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
    // 其他配置项 ...
    corePlugins: {
        // 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
        preflight: false,
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#ef9995',

                    secondary: '#a4cbb4',

                    accent: '#dc8850',

                    neutral: '#2e282a',

                    'base-100': '#E8E7DD',

                    info: '#2463eb',

                    success: '#16a249',

                    warning: '#db7706',

                    error: '#dc2828',
                },
            },
            {
                dark: {
                    primary: '#11f79b',

                    secondary: '#ea6462',

                    accent: '#9494e0',

                    neutral: '#25213b',

                    'base-100': '#394047',

                    info: '#5dabee',

                    success: '#6febb2',

                    warning: '#e49f0c',

                    error: '#e9447b',
                },
            },
        ],
    },
    theme: {
        container: {
            screens: {
                sm: '100%',
            },
        },
    },
}
