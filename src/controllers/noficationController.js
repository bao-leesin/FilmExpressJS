const Notification = require("../models/Notification")

const createNoti = async (req,res,next) => {
    const input = req.body
    const title = input.title
    const content = input.content
    try {
        let noti = new Notification(title,content)
        await noti.createNoti()
        const output = noti.getAllNoti()
        res.send(output) 
    } catch (error) {
        res.status(400).send(error)
    }

}