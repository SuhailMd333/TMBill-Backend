const jwt = require('jsonwebtoken');    

const authentication =   (req, res, next) => {
        // try {
            const token = req.header("authToken");
            console.log(req.header("authToken"))
             if(!token){
      return res.status(401).json({ 
                success: false,
                error: 'Authorization token required',
                hint: 'Send token in Authorization: Bearer <token> or auth-token header'
            });
    }
            const decoded =  jwt.verify(token,'suhailisagoodboy', {
            algorithms: ['HS256'] // Specify expected algorithm
        });
            req.user = decoded.user;
            next();
// }
        // catch (error) {
        //     res.status(401).json({ message: 'Authentication failed' });
        // }
    }



module.exports = authentication;