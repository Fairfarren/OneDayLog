import type { UserConfigExport } from '@tarojs/cli'

export default {
    env: {
        NODE_ENV: '"production"',
        // NODE_HOST: '"http://43.136.233.177:8080"',
        NODE_HOST: '"https://apiwx.xiongxin.top"',
    },
} satisfies UserConfigExport<'webpack5'>
