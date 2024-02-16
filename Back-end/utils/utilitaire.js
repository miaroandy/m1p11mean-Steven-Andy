
class Utilitaire {
    
    static verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        jwt.verify(token, 'votre_clé_secrète', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalide' });
            }
            req.user = decoded;
            next();
        });
    }
}

module.exports = Utilitaire;