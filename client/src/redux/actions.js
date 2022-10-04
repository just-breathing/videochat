import actionTypes from "./actionstypes"
export const setPro = (prod)=>{
    return {
        type:actionTypes.setPro,
        paylaod:prod
    };
};

export const remPro = (prod)=>{
    return {
        type:actionTypes.remPro,
        paylaod:prod
    };
};

export const addPro = (prod)=>{
    return {
        type:actionTypes.addPro,
        paylaod:prod
    };
};