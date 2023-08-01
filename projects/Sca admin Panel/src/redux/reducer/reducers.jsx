export const Category=(state=0, action)=>{
    switch(action.type){
        case 'GetCategory':
            return {
                
            }
        default:
            return state;
    }
}

export const Product=(state=0, action)=>{
    switch(action.type){
        case 'GetCategory':
            return state+1;
        default:
            return state;
    }
}