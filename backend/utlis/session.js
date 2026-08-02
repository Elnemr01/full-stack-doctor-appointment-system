import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};

export const setSessionToken = (req, token) => {
    req.session.token = token;
};

export const clearSession = (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export const getSessionToken = (req) => {
    return req.session?.token;
};

export const createUserResponse = (user, token) => {
    const { password, ...userData } = user._doc || user;
    return { user: userData, token };
};