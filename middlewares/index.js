const { validateToken } = require("../token");

const auth = (req, res, next) => {
  console.log(
    req.headers["x-access-token"] +
      "\n verifyToken processing in auth ..." +
      req.originalUrl
  );
  const accessToken =
    req.body.token || req.query.token || req.headers["x-access-token"];

  console.log("accessToken", accessToken, typeof accessToken); // returning string datatype null

  // if (!accessToken) {
  if (accessToken == "null") {
    console.log("Invalid or Missing Auth Key.");
    return res
      .status(403)
      .json({ msg: "Invalid or Missing Auth Key", error: true });
  }

  try {
    const decoded = validateToken(accessToken);
    req.user = decoded;
    console.log("req.user ", req.user);
  } catch (err) {
    console.log("invalid Token in auth ..." + err);
    return res
      .status(403)
      .json({ msg: "Invalid or Expired Auth Key", error: true });
  }

  return next();
};

const errHandler = (err, req, res, next) => {
  console.log(err);

  return res.status(err.statusCode || 500).json({
    error: true,
    msg: err.message || "Internal Error",
  });
};

module.exports = { auth, errHandler };
