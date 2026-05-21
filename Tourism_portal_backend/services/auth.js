import jwt from 'jsonwebtoken';
export const setUser = (user) => {
    return jwt.sign({
        id:user._id, email:user.email
    },process.env.SECRET,{expiresIn:'1d'});
}

export const getUser = (token) => {
    if(!token) return null;
    return jwt.verify(token,process.env.SECRET);
}

