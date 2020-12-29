const express  = require('express')
const app      = express()
const mongoose = require('mongoose')
//Middleware bodyparser
const bodyParser = require('body-parser')
//definisikan file .env untuk menghubungkan port dan database dengan file ini
require('dotenv/config')

//panggil body-parser
app.use(bodyParser())

//import routes
const santriRoutes = require('./routes/santri')


//routes (dengan callback)
app.use('/santri',santriRoutes)

//Koneksi ke DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true})
//Masukan koneksii kedalam variabel "let db"
let db = mongoose.connection

//Membuat handle error
db.on('error', console.error.bind(console, 'Database connect error'))
//Membuat handle berhasil (dengan callback)
db.once('open',()=>{
    console.log('Database is connected')
})
//Listen
app.listen(process.env.PORT, ()=>{
    //untuk menampilkan status server (menggunakan backtick)
    console.log(`Server running in ${process.env.PORT}`)
})