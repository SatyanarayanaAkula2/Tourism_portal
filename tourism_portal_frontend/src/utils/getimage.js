const BASE_URL=import.meta.env.VITE_API_URL;

export const getImageUrl=(path)=>{
    if(!path) return "";
    return `${BASE_URL}${path}`
};