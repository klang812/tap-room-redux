import kegListReducer from '../../reducers/keg-list-reducer';

describe('kegListReducer', () => {

  const currentState = {
    1: {name: 'IPA',
    brand: 'Migration',
    price: '4.00',
    alcoholContent: '7.4',
    quantity: '50',
    id: 1},
    2:  {name: 'IRA',
    brand: 'Culmination',
    price: '5.00',
    alcoholContent: '5.6',
    quantity: '65',
    id: 2}
  }

  let action;
  const kegData = {
    name: 'IPA',
    brand: 'Migration',
    price: '4.00',
    alcoholContent: '7.4',
    quantity: '50',
    id: 1
  };

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(kegListReducer({}, {type: null})).toEqual({});
  });

  test('Should successfully add new keg data to masterKegList', () => {
    const { name, brand, price, alcoholContent, quantity, id } = kegData;
    action = {
      type: 'ADD_KEG',
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      quantity: quantity,
      id: id
    };
    expect(kegListReducer({}, action)).toEqual({
      [id] : {
        name: name,
        brand: brand,
        price: price,
        alcoholContent: alcoholContent,
        quantity: quantity,
        id: id
      }
    });
  });

  test('Should successfully delete a keg', () => {
    action = {
      type: 'DELETE_KEG',
      id: 1
    };
    expect(kegListReducer(currentState, action)).toEqual({
      2:  {name: 'IRA',
    brand: 'Culmination',
    price: '5.00',
    alcoholContent: '5.6',
    quantity: '65',
    id: 2}
    });
  });
});