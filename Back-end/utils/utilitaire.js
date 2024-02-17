const jwt = require('jsonwebtoken');
const secret_key = process.env.secretKey;

class Utilitaire {
    
    static verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        try {
            const decoded = jwt.verify(token, secret_key);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        
    }
}

module.exports = Utilitaire;