import kegEditReducer from '../../reducers/keg-edit-reducer';
import * as c from '../../actions/ActionTypes';

describe('editKegReducer', () => {

  test('Should return default state if no action type is recognized', () => {
    expect(kegEditReducer(false, { type: null })).toEqual(false);
  });

  test('Should toggle form visibility state to true', () => {
    expect(kegEditReducer(false, { type: c.TOGGLE_EDIT })).toEqual(true);
  });
});
