const express = require('express')
const router = express.Router()
//Import Schema
const Santri = require('../models/Santri')

//CREATE DATA
router.post('/',async (req,res)=>{
    //Panggil Schema
    const santriPost = new Santri({
        nama: req.body.nama,
        alamat: req.body.alamat
        //Untuk tanggal akan otomatis set (tanggal saat ini)
    })
    //Handling status dan error
    try {
        const santri = await santriPost.save()
        res.json(santri)
    } catch (err) {
        res.json({message:err})
    }
})

//READ DATA
router.get('/',async(req,res)=>{
    try {
        //Panggil Scheme
        const santri = await Santri.find()
        res.json(santri)
    } catch (err) {
        res.json({message:err})
    }
})

//UPDATE DATA
router.put('/:santriId', async(req, res)=>{
    try {
        const santriUpdate = await Santri.updateOne({_id: req.params.santriId},
        {
            nama:req.body.nama,
            alamat:req.body.alamat
        })
        res.json(santriUpdate)
    } catch (err) {
        res.json({message:err})
    }
})

//DELETE DATA
router.delete('/:santriId', async(req, res)=>{
    try {
        const santriUpdate = await Santri.deleteOne({_id: req.params.santriId})
        res.json(santriUpdate)
    } catch (err) {
        res.json({message:err})
    }
})

//Supaya bisa digunakan di index.js
module.exports = router