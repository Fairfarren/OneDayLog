const fs = require('node:fs')

fs.readFile('./project.config.json', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    const json = JSON.parse(String(data))
    console.log(process.env.NODE_APPID)
    json.appid = process.env.NODE_APPID

    fs.writeFile('./project.config.json', JSON.stringify(json), (err) => {
        if (err) {
            throw new Error('写入失败')
        }
    })
})
