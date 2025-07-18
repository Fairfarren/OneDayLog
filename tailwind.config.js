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
    theme: {
        container: {
            screens: {
                sm: '100%',
            },
        },
        extend: {
            colors: {
                green: '#01ce9a',
                red: '#fe6058',
                red2: '#FF0303',
                blue: '#4EA5FF',
                orange: '#FF8D19',
                'border-color': '#eaeaea',
                'green-shadow': '#01ce9b',
                green2: '#01cc82',
                'green-bg': '#e5faf4',
                'green-border': '#d5efe3',
                orange2: '#D59562',
                orange3: '#DDB999',
                'orange-bg': '#fff3ea',
                'orange-bg2': '#FFFBF7',
                'red-bg': 'rgba(254, 96, 88, 0.1)',
                'gray-text': '#A6A6A6',
                'gray-bg': '#F5F5F5',
                'gray-6': '#666666',
                'gray-8c': '#8c8c8c',
                'gray-3': '#333333',
                'gray-4d': '#4d4d4d',
                'gray-9': '#999999',
                'gray-a': '#aaaaaa',
                'gray-b': '#BBBBBB',
                'gray-c': '#B9AAA1',
                black: '#262626',
                blue2: '#81C2EB',
                bg: '#F7F7F7',
                'white-border': '#efefef',
                purple: '#7875D6',
            },
            fontFamily: {
                'JDZhengHT-Bold': 'JDZhengHT-Bold',
                'JDZhengHT-Light': 'JDZhengHT-Light',
                'JDZhengHT-Regular': 'JDZhengHT-Regular',
            },
        },
    },
}
