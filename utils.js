import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({

            phone: user.phone,
            pass: user.pass,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || "randomSecret", { expiresIn: "30d" }
    );
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); //Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || "randomSecret",
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: "Invalid Token" });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: "Invalid Token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: "Invalid Admin Token" });
    }
};