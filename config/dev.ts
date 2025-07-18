import type { UserConfigExport } from '@tarojs/cli'

export default {
    env: {
        NODE_ENV: '"development"',
        NODE_HOST: process.env.NODE_API_PORD
            ? '"https://apiwx.xiongxin.top"'
            : '"https://apiwx.xiongxin.top"',
        //   '"http://1.95.6.15:9090"',
    },
    logger: {
        quiet: false,
        stats: true,
    },
    mini: {},
    h5: {},
} satisfies UserConfigExport<'webpack5'>
