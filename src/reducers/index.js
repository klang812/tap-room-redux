import formVisibleReducer from './form-visible-reducer';
import ketListReducer from './keg-list-reducer';
import kegEditReducer from './keg-edit-reducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterKegList: ketListReducer,
  editing: kegEditReducer 
});

export default rootReducer;
