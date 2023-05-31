const jwt = require("jsonwebtoken");

//const user=req.param('user');
const token_private_key = process.env.JWT_SECRET;
//const generateToken =

const generateToken = (user) => {
  let token =  jwt.sign({ ...user }, token_private_key, { expiresIn: "1h" });
  return token ;
};


const validateToken = (accessToken) => {
    const decoded = jwt.verify(accessToken, token_private_key);
    return decoded ;
}

module.exports = {generateToken, validateToken}