const jwt = require('jsonwebtoken'); // Ensure you are using JWT for authentication


const verifyToken = (role='user') => {  
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; 
        console.log(token);
        

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = decoded;  

            
            if (role === 'user' || (req.user && req.user.role && req.user.role.includes(role))) {
                next();  // Proceed to the next middleware or route handler
            } else {
                res.status(403).json({ error: 'Forbidden. Insufficient permissions.' });
            }
        } catch (error) {
            res.status(400).json({ error: 'Invalid token.' });
        }
    };
}

module.exports = verifyToken;
