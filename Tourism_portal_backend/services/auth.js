import jwt from 'jsonwebtoken';
const secret=process.env.SECRET;


export const setUser = (user) => {
    return jwt.sign({
        id:user._id, email:user.email
    },secret,{expiresIn:'1d'});
}

export const getUser = (token) => {
    if(!token) return null;
    return jwt.verify(token,secret);
}

