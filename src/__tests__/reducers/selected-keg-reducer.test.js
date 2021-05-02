import selectedKegReducer from '../../reducers/selected-keg-reducer';
import * as c from '../../actions/ActionTypes';

describe('selectedKegReducer', () => {
  let action;

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

  const kegDetail = {
    name: 'IPA',
      brand: 'Migration',
      price: '4.00',
      alcoholContent: '7.4',
      quantity: '50',
      id: 1
  }

  test('Should return default state', () => {
    expect(selectedKegReducer({}, { type: null })).toEqual({});
  });

  test('Should return a keg at the id number', () => {
    const { name, brand, price, alcoholContent, quantity, id } = kegDetail
    action = {
      type: c.SELECTED_KEG,
      name: name,
      brand: brand,
      price: price,
      alcoholContent: alcoholContent,
      quantity: quantity,
      id: id
    }
    expect(selectedKegReducer({}, action)).toEqual(kegDetail);
  });

  test('Should successfully reset selected keg to default value', () => {
    action = {
      type: c.UNSELECTED_KEG
    }
    expect(selectedKegReducer({}, action)).toEqual(null);
  });

});

