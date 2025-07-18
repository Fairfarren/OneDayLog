const fs = require('node:fs')

const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})
const returnModule = require('./module/pageModule.ts')

function getName() {
    return new Promise((resolve) => {
        readline.question(
            `page名称叫什么？（格式用a_b的方式，编译后为name:aB, funName:AB, pathName:A_B）`,
            (name) => {
                resolve(name)
            },
        )
    })
}

function getTitle() {
    return new Promise((resolve) => {
        readline.question(`页面title叫什么？`, (title) => {
            resolve(title)
            readline.close()
        })
    })
}

async function app() {
    const name = await getName()
    const title = await getTitle()

    console.log(name, title)

    console.log(returnModule)

    const data = returnModule({
        name,
        title,
    })
    console.log(data)

    const path = `./src/pages/${data.pageName}`

    fs.mkdirSync(path, { recursive: true })
    console.log('成功创建文件夹')
    fs.writeFile(`${path}/index.tsx`, data.page, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('成功创建index.tsx')
        }
    })
    fs.writeFile(`${path}/index.config.ts`, data.config, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('成功创建config.ts')
        }
    })
    fs.writeFile(`${path}/index.module.scss`, data.scss, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('成功创建scss')
        }
    })
}

app()
