const fs = require('node:fs')

function returnModule({ name, title }) {
    console.log(name)

    const pageName = name
        .split('_')
        .map((item, index) => {
            if (index > 0) {
                item = item.slice(0, 1).toUpperCase() + item.slice(1)
            }

            return item
        })
        .join('')

    const pageFunName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

    const page = `import { Share } from '@/components/share'
import DiyHeader from '@/components/diyHeader'

function ${pageFunName} () {
    return <Share>
        <DiyHeader title="${title}" />
        <div>${name}</div>
    </Share>
}

export default ${pageFunName}
`

    const config = `export default definePageConfig({
    navigationBarTitleText: '${title}',
    navigationStyle: 'custom',
    enableShareAppMessage: true,
})
`
    const scss = ''

    fs.readFile('./src/const/path.ts', (err, data) => {
        if (err) {
            console.log('读取失败')
            return
        }
        const str = String(data)
        const newPath = str.replace(
            '/** NODE_ADD_PAGE_THERE */',
            `${name.toUpperCase()}: '/pages/${pageName}/index',
    /** NODE_ADD_PAGE_THERE */`,
        )

        fs.writeFile('./src/const/path.ts', newPath, (err) => {
            if (err) {
                console.log('写入失败')
            }
        })
    })

    return {
        page,
        config,
        scss,
        pageName,
    }
}

module.exports = returnModule
