import { GET_SHOW } from './show.actions';

const initialState = {
  show: {},
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOW:
      return {...state, show: action.show}
    default:
      return state;
  }
};

export default showReducer;