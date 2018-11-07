import { GET_EPGS } from './epgs.actions';

const initialState = {
  epgs: [],
};

const epgsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPGS:
      return {...state, epgs: action.epgs}
    default:
      return state;
  }
};

export default epgsReducer;
