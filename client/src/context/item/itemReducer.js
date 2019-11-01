import { GET_ITEMS, ADD_ITEM } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    default:
      console.error('This should happen - itemReducer.js');
      return state;
  }
};
