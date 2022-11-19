const Subscription = require("../models/Subscription")

const createSub = async (req,res,next) => {
    const {tenGoi,giaTien,thoiHanGoi} = req.body
    let sub = new Subscription(null,tenGoi,giaTien,thoiHanGoi)
    try {
        await sub.createSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateSub = async (req,res,next) => {
    const {idGoi,tenGoi,giaTien,thoiHanGoi} = req.body
    let sub = new Subscription(idGoi,tenGoi,giaTien,thoiHanGoi)
    try {
        await sub.updateSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteSub = async (req,res,next) => {
    const idGoi = req.params.idGoi
    let sub = new Subscription()
    try {
        sub.setId = idGoi
        await sub.deleteSub()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllSub = async (req,res,next) => {
    try {
        let sub = new Subscription()
        const subs = await sub.getAllSub()
        res.send(subs)
    } catch (error) {
        res.status(400).send(error.message)
    }
}



module.exports = {
    createSub,
    updateSub,
    deleteSub,
    getAllSub
}