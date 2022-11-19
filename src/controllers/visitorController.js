const {
  ValidationError,
  FieldRequiredError,
  NotFoundError,
} = require("../helper/customError");
const { jwtSign } = require("../helper/jwt");
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");
const Visitor  = require("../models/Visitor")
const Film = require("../models/Film");
const User  = require("../models/User");


  const login = async (req,res,next) => {
    const account = req.body;
    let visitor = new Visitor();
    visitor.setUsername = account.username;
    visitor.setPassword = account.password;
    const password = visitor.getPassword;
    try {
       const existentUser = await visitor.signIn();
       if (!existentUser) throw new NotFoundError("sign in first")
       const pwd = await bcryptCompare(password, existentUser.matKhau)
       if (!pwd) throw new ValidationError("Wrong password")
      const jwt = await jwtSign(existentUser)
      if (jwt) res.send(jwt)
     } catch (error) {
      res.send(error.message)
     }
   }

   const register = async (req,res,next) => {
    const {tenDangNhap,matKhau,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh} = req.body;
    console.log(req.body,gioiTinh);
    try { 
  if (!tenDangNhap) throw new FieldRequiredError(`A tenDangNhap`);
    if (!matKhau) throw new FieldRequiredError(`A matKhau`);
    if (!vaiTro) throw new FieldRequiredError(`A vaiTro`);
    if (!diaChi) throw new FieldRequiredError(`A diaChi`);
    if (!email) throw new FieldRequiredError(`A email`);
   
    const hashPassword = await bcryptHash(matKhau);
    let user = new User(tenDangNhap,hashPassword,vaiTro,diaChi,ngaySinh,email,tenDayDu,gioiTinh);
    await user.signUp()
    const newUser = await user.getUserById()
      res.send(newUser)
    if(newUser){
      const jwt = await jwtSign(newUser)
      res.send(jwt)
    } 
  }catch (error){
    res.status(400).send(error)
  }
}

const showHomePage =async (req,res,next) =>{
  const view = 500
  const topNew= 5
  const topRating = 5
  const topLiked = 5
  try {
  let film = new Film();
  film.setView = view
  const hotFilm = await film.getFilmByViews()
  film.setTop = topRating
  const appreciatedFilm = await film.getFilmByRatings()
  film.setTop = topNew
  const newFilm = await film.getNewFilm();
  const dataFilm = {
      phimHot:hotFilm,
      phimDanhGiaCao:appreciatedFilm,
      phimMoi:newFilm
  }
  res.send(dataFilm)
  } catch (error) {
  res.send(error)
  }
}


module.exports = {
login,
register,
showHomePage
}

