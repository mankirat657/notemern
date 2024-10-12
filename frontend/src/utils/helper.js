export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
export const getInitials = (name) =>{
    if(!name) return "";

    const words = name.split(" ");
    let initilas = "";

    for(let i = 0; i<Math.min(words.length, 2); i++){
        initilas += words[i][0];
    }
    return initilas.toUpperCase()
}