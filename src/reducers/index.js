import formVisibleReducer from './form-visible-reducer';
import ketListReducer from './keg-list-reducer';
import kegEditReducer from './keg-edit-reducer';
import { combineReducers } from 'redux';
import selectedKegReducer from './selected-keg-reducer';


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterKegList: ketListReducer,
  editing: kegEditReducer,
  selectedKeg: selectedKegReducer
});

export default rootReducer;
