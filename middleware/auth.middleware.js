const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    // Kiểm tra Authorization header
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader); // Debug log

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token); // Debug log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Debug log

        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('JWT Error:', error); // Debug log
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
