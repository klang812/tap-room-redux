import * as c from './../actions/ActionTypes';


export default (state = null, action) => {
  const { name, brand, price, alcoholContent, quantity, id } = action;
  switch (action.type) {
    case c.SELECTED_KEG:
      return Object.assign({}, state, {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        quantity: quantity,
        id: id
      });
    case c.UNSELECTED_KEG:
      return null; 
    default: 
      return state;
    }
  };  
