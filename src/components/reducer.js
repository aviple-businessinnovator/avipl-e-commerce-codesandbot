export const initialState = {
    basket: [],
    product: null,
};
export const getBasketTotal = (basket) => {
    let price = 0;
    basket.forEach(({ product, quantity }) => {
        price += product.price * quantity;
    })
    return price;
}
// basket?.reduce(( amount, item ) => item.new_price * item.quantity + amount, 0);

export const getBasketTotaldiscount = (basket) => {
    let price = 0;
    basket.forEach(({ product, quantity }) => {
        price += product.discountedPrice * quantity;
    })
    return price;
}
// basket?.reduce((amount, item) => item.old_price * item.quantity + amount, 0);

export const IsExist = (basket, id) => {
    let flg = 0;
    basket.forEach(({ product }) => {
        if (product._id == id) {
            flg = 1;
            return flg;
        }
    });
    console.log("flag", flg);
    return flg;
}
export const getSize = (basket) => {
    return basket.length;
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ALL':
            let it = action.item;
            console.log("s", it);
            return {
                ...state,
                basket: it
            }
        // case 'ADD_TO_BASKET':
        //     return {
        //         ...state,
        //         basket: [...state.basket, action.item],
        //     };
        case 'BUY_NOW':
            return {
                ...state,
                product: action.item,
            };
        case 'REMOVE_ITEM': {
            let arr = [...state.basket],
                temp = [];
            arr.forEach((element, ind) => {
                if (element.id !== action.id) {
                    temp.push(element);
                } else {
                    if (element.quantity > 1) {
                        if (element.quantity == 1) {
                            element.quantity = 0;
                        }
                        else {
                            element.quantity = element.quantity - 1;
                        }
                        temp.push(element);
                    }
                }
            });
            state.basket = temp;
            return {
                ...state,
            };
        }
        case 'INCREASE_ITEM_QUANTITY': {
            state.basket.forEach((element) => {
                if (element.id === action.id) {
                    element.quantity = element.quantity + 1;
                }
            });
            console.log("inside reducer", state.basket);

            return {
                ...state,
            };
        }

        default:
            return state;
    }

}


export default reducer;