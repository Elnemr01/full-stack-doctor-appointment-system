import jwt from 'jsonwebtoken';

const generateJWT = async (payload) => {
    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn :'1m'});
    return token;
};

export default generateJWT;
