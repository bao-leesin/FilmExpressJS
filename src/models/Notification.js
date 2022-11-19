const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");

class Notification{
    #id;
    #title;
    #content;
    constructor(title,content){
        this.#title = title
        this.#content = content
    }

    createNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO thong_bao VALUES(?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#title,this.#content],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    getAllNoti(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM thong_bao"
        if (err) throw err
        connection.query(
        query,
        [],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }

    pushNotification(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT tieuDeThongBao, noiDungThongBao FROM thong_bao WHERE idThongBao = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError() 
        resolve(rows)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
    }
}

module.exports = Notification