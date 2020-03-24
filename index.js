const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')


const app = express()
const port = 8000;
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: "opd"
}) 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

/** CRUD Books ***/

app.get('/pasien',  (req, res) => {
    let sql = `
        select nama_pasien, asal, umur from pasien
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "success ",
            data: result
        })
    })
})

app.post('/pasien',(req, res) => {
    let data = req.body

    let sql = `
        insert into pasien (nama_pasien, asal, umur)
        values ('`+data.nama_pasien+`', '`+data.asal+`', '`+data.umur+`')
    `

    db.query(sql, (err, result) => {
        if (err) throw err

        res.json({
            message: "data created",
            data: result
        })
    })
})

app.get('/pasien/:id_pasien',(req, res) => {
let sql = `
    select * from pasien
    where id_pasien = `+req.params.id_pasien+`
    limit 1
`

db.query(sql, (err, result) => {
    if (err) throw err

    res.json({
        message: "success get data's detail",
        data: result[0]
    })
})
})

app.put('/pasien/:id_pasien', (req, res) => {
let data = req.body

let sql = `
    update pasien
    set nama_pasien = '`+data.nama_pasen+`', asal = '`+data.asal+`', umur = '`+data.umur+`'
    where id_pasien = '`+req.params.id_pasien+`'
`
db.query(sql, (err, result) => {
    if (err) throw err

    res.json({
        message: "data has been updated",
        data: result
    })
})
})

app.delete('/pasien/:id_pasien', (req, res) => {
let sql = `
    delete from pasien
    where id_pasien = '`+req.params.id_pasien+`'
`

db.query(sql, (err, result) => {
    if (err) throw err
    
    res.json({
        message: "data has been deleted",
        data: result
    })
})
})
    app.listen(port, () => {
        console.log('App running on port ' + port)
    })