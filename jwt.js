import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) => {
    const token=RegExp.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Invalid token' });

    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30 });
}

// export default {jwtAuthMiddleware, generateToken};
export default generateToken;
// export default generateToken;