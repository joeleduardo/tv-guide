import { combineReducers } from 'redux';
import epgsReducer from './epgs.reducer';
import showReducer from './show.reducer';

const reducer = combineReducers({
  epgsReducer,
  showReducer
});

export default reducer;
