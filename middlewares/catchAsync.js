
const catchAsync = (passFunc) => (req, res, next) => {
    Promise.resolve(passFunc(req,res,next)).catch(next)
}

module.exports = {catchAsync}