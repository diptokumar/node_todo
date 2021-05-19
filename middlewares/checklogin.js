const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {userName, userId} = decodedToken;
        req.userName = userName;
        req.userId = userId;
        next();
    } catch (error) {
        res.status(500).json({
            message: 'Authentication failed'
        })
    }
}


module.exports = checkLogin;