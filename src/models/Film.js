const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");
const pool = require("../config/configMysql");
const User = require("./User");

class Film{
    #id
    #name
    #genre
    #description
    #rating
    #trailer
    #view
    #releaseDay
    #idUser
    #image
    #top
    constructor(name,description,rating,trailer,view,releaseDay){
        this.#name= name
        this.#description= description
        this.#rating= rating
        this.#trailer= trailer
        this.#view= view
        this.#releaseDay= releaseDay
    }

    set setId(id) {
      this.#id = id;
    }
  
    get getId() {
      return this.#id;
    }

    set setName(name) {
      this.#name = name;
    }
  
    get getName() {
      return this.#name;
    }

    set setGenre(genre) {
      this.#genre = genre;
    }
  
    get getGenre() {
      return this.#genre;
    }

    set setIdUser(idUser) {
      this.#idUser = idUser;
    }
  
    get getIdUser() {
      return this.#idUser;
    }

    set setRating(rating) {
      this.#rating = rating;
    }
  
    get getRating() {
      return this.#rating;
    }

    set setImage(image) {
      this.#image = image;
    }
  
    get getImage() {
      return this.#image;
    }

// Nhóm chức năng tìm kiếm, show dữ liệu

    getAllFilm(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim"
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
        connection.release()
      reject(error)
      console.log(error)
      }})})}

    getFilmById(){
     return new Promise((resolve, reject) => {
       pool.getConnection( (err,connection) =>{ 
     try {
     const query = "SELECT * FROM phim WHERE idPhim = ?"
     if (err) throw err
     connection.query(
     query,
     [this.#id],
     (err,rows) =>{
     if (err) throw err
    //  if(rows.length === 0) throw new NotFoundError() 
     resolve(rows[0])
    })
    connection.release()
     }catch (error) {
      connection.release()
      reject(error)
     console.log(error)
    }})})}

    getFilmByName(){
      return new Promise((resolve, reject) => {
      pool.getConnection( (err,connection) =>{ 
      try {
      const query = "SELECT * FROM phim WHERE tenPhim LIKE" 
      + "'%" + this.#name + "%'" 
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
        connection.release()
        reject(error)
      console.log(error)
      }})})}

    getFilmByViews(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
          try {
            const query = "SELECT * FROM phim WHERE luotXem > ?"
            if (err) throw err
            connection.query(
              query,
              [this.#view],
              (err,rows) =>{
                if (err) throw err
                else resolve(rows)
              })
              connection.release();
            
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
          }})})}
    
      getFilmByRatings(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ if (err) throw err
          try {
              const query = "SELECT * FROM phim WHERE idPhim IN (SELECT idPhim FROM khach_hang_danh_gia ORDER BY soSaoDanhGia DESC) LIMIT ?"
            connection.query(
              query,
              [this.#top],
              (err,rows) => {
                if (err) throw err
                else resolve(rows)
              })
              connection.release()
          } catch (error) {
            connection.release();
            reject(error)
            console.log(error);
            
          }})})}
    
      getNewFilm(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
         try {
        const query = "SELECT * FROM phim ORDER BY ngayChieu DESC LIMIT ?"
          if (err) throw err
         connection.query(
          query,
          [this.#top],
          (err,rows) =>{
            if (err) throw err
            else resolve(rows)
          })
        connection.release()      
      } catch (error) {
        connection.release()
        reject(error)
        console.log(error)
      
      }})})
      }

      getFilmByGenres(){
        return new Promise((resolve, reject) => {
          pool.getConnection( (err,connection) =>{ 
        try {
        const length = this.#genre.length
        const query = "SELECT * FROM phim WHERE idPhim IN" +
        "(SELECT idPhim FROM phim__the_loai WHERE theLoai IN" +
          "(?) GROUP BY idPhim HAVING COUNT(*) = ?)"
        if (err) throw err
        connection.query(
        query,
        [this.#genre,length],
        (err,rows) =>{
        if (err) throw err
        if(rows.length === 0) throw new NotFoundError()
        resolve(rows)
        })
        connection.release()
        
        }catch (error) {
          connection.release()
          reject(error)
        console.log(error)
        }})})
      }

      showRatingFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT round(AVG(soSaoDanhGia)) AS tb FROM khach_hang_danh_gia WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        this.#rating = rows[0].tb
        resolve(this.#rating)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }

      getFilmImages(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "SELECT duongDanAnh FROM phim__anh_cua_phim WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
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

// *****************************************************************************************
      // Nhóm chức năng thêm

      createFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim VALUES(?,?,?,?,?,?,?)"
        if (err) throw err
        connection.query(
        query,
        [null,this.#name,this.#description,this.#rating,this.#trailer,this.#view,this.#releaseDay],
        (err,rows) =>{
        if (err) throw err
        // if(rows.length === 0) throw new NotFoundError() 
        this.#id = rows.insertId 
        resolve(rows.insertId)
        })
        connection.release()
        }catch (error) {
        reject(error)
        console.log(error)
        }})})
      }
    
      rateFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO khach_hang_danh_gia VALUES(?,?,?)" 
        if (err) throw err
        connection.query(
        query,
        [this.#idUser,this.#id,this.#rating],
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

      createFilmImages(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "INSERT INTO phim__anh_cua_phim VALUES(?,?)"
        if (err) throw err
        connection.query(
        query,
        [this.#id,this.#image],
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

      

      // *****************************************************************************************
      // Nhóm chức năng Sửa

      updateFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "UPDATE phim SET" +
                      "tenPhim = ?, moTa = ?, danhGiaPhim = ?, trailer = ?, luotXem = ?, ngayChieu = ?" +
                      "WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#name, this.#description, this.#rating, this.#trailer, this.#view, this.#releaseDay, this.#id],
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


      // *****************************************************************************************
      // Nhóm chức năng Xoá
      deleteFilm(){
        return new Promise((resolve, reject) => {
        pool.getConnection( (err,connection) =>{ 
        try {
        const query = "DELETE FROM phim WHERE idPhim = ?"
        if (err) throw err
        connection.query(
        query,
        [this.#id],
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

}

module.exports = Film;