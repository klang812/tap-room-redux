import formVisibleReducer from './form-visible-reducer';
import ketListReducer from './keg-list-reducer';
import { combineReducers, createStore } from 'redux';


const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  masterKegList: ketListReducer 
});

export default rootReducer;
