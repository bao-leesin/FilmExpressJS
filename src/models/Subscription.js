const {
    ValidationError,
    FieldRequiredError,
    AlreadyTakenError,
    NotFoundError,
  } = require("../helper/customError");
  const pool = require("../config/configMysql");

class Subscription{
    #id;
    #name;
    #price;
    #validity;

    constructor(name,price,validity){
        this.#name = name
        this.#price = price
        this.#validity = validity
    }


    getAllSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT * FROM goi_xem_phim"
        if (err) throw err
        connection.query(
        query,
        [],
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

    createSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO goi_xem_phim VALUES(?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#name,this.#price,this.#validity],
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

    updateSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE goi_xem_phim SET tenGoi = ?, giaTien = ?, thoiHanGoi = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name,this.#price,this.#validity],
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

    deleteSub(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM goi_xem_phim WHERE idGoi = ?"
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

module.exports = Subscription