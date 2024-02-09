import jwt from "jsonwebtoken";

 export const verifyToken = (action,module) => {
    return (req,res,next) => {
        const { access_token } = req.cookies;
        if (!access_token) {
        res.status(401).send('Authentication required.');
        return;
        }
        jwt.verify(access_token, process.env.JWT, (err, decoded) => {
        if (err) {
        res.status(403).send('Invalid token.');
        return;
        }
        // console.log("The decoded token "+ decoded);
        // req.user = decoded;
        const { permissions } = decoded;
        const found = permissions.some(el => el.name === module && el.rules[action])
        if(!found) {
            res.status(403).send('You are not authorized to perform this action');
            return;
        }
        next();
        });
    }
};

