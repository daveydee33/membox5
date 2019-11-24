import { FETCH_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      console.error('Probably an issue - authReducer.js');
      return state;
  }
};
