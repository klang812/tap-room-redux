import * as c from './../actions/ActionTypes';

export const deleteKeg = id => ({
  type: c.DELETE_KEG,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const addKeg = (keg) => {
  const { name, brand, price, alcoholContent, quantity, id } = keg;
  return {
    type: c.ADD_KEG,
    name: name,
    brand: brand,
    price: price,
    alcoholContent: alcoholContent,
    quantity: quantity,
    id: id
  }
};

export const toggleEdit = () => ({
  type: c.TOGGLE_EDIT
});

export const selectedKeg = (keg) => {
  const { name, brand, price, alcoholContent, quantity, id } = keg;
  return {
    type: c.SELECTED_KEG,
    name: name,
    brand: brand,
    price: price,
    alcoholContent: alcoholContent,
    quantity: quantity,
    id: id
  }
};

export const unselectedKeg = () => ({
  type: c.UNSELECTED_KEG
});

export const listKegs = () => ({
  type: c.LIST_KEGS
});

export const restockKeg = () => ({
  type: c.RESTOCK_KEG
});
