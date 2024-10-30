const jwt = require('jsonwebtoken');
require('dotenv').config();

const postMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex.message);
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = postMiddleware;