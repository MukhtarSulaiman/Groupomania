const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

// Checks if the authentication matches u
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.USER_TOKEN);
        const now = Date.now() / 1000;
        if (decodedToken.exp < now) {
            throw 'Veuillez fournir un token valide !' 
        }
        else {
            next();
        } 
    } catch {
        res.status(401).json({ 
            Error: 'L\'utilisateur n\'est pas autorisé, veuillez fournir un token valide !' });
    }
};
  