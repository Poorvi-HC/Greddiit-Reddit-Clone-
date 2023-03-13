import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        console.log("entered authorization function verifyToken");
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied!");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).send("Invalid token.");
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
