import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import kegEditReducer from '../../reducers/keg-edit-reducer';
import kegListReducer from '../../reducers/keg-list-reducer';
import selectedKegReducer from '../../reducers/selected-keg-reducer';
import * as c from '../../actions/ActionTypes';


let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterKegList: {},
      formVisibleOnPage: false, 
      editing: false,
      selectedKeg: null
    });
  });

  test('Check that initial state of ketListReducer matches root reducer', () => {
    expect(store.getState().masterKegList).toEqual(kegListReducer(undefined, { type: null }));
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });

  test('Check that initial state of kegEditReducer matches root reducer', () => {
    expect(store.getState().editing).toEqual(kegEditReducer(undefined, { type: null }));
  });

  test('Check that initial state of selectedKegReducer matches root reducer', () => {
    expect(store.getState().selectedKeg).toEqual(selectedKegReducer(undefined, { type: null }));
  });

  test('Check that ADD_KEG action works for kegListReducer and rootReducer', () => {
    const action = {
      type: c.ADD_KEG,
      name: 'IPA',
      brand: 'Migration',
      price: '4.00',
      alcoholContent: '7.4',
      quantity: '50',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().masterKegList).toEqual(kegListReducer(undefined, action));
  });

  test('Check that TOGGLE_FORM action works for formVisibleReducer and rootReducer', () => {
    const action = {
      type: c.TOGGLE_FORM
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });

  test('Check that TOGGLE_EDIT action works for kegEditReducer and rootReducer', () => {
    const action = {
      type: c.TOGGLE_EDIT
    }
    store.dispatch(action);
    expect(store.getState().editing).toEqual(kegEditReducer(false, action));
  });

  test('Check that SELECTED_KEG action works for selectedKegReducer and rootReducer', () => {
    const action = {
      type: c.SELECTED_KEG,
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().selectedKeg).toEqual(selectedKegReducer(undefined, action));
  });
});
