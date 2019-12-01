import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_ITEMS,
  CLEAR_FILTER
} from '../types';

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
    case UPDATE_ITEM:
      return {
        ...state,
        // idea 1 - push the new item to the front of the array, and remove it's previous record out of it's place in the array
        // items: [
        //   action.payload,
        //   ...state.items.filter(item => item._id !== action.payload._id)
        // ],
        // idea 2 - this will replace the item in it's existing position in the array.  I think I like this method better, because I can always sort the array by dateModified later.
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_ITEMS:
      return {
        ...state,
        filteredItems: state.items.filter(item => {
          const regex = new RegExp(`${action.payload}`, 'gi');

          // to handle if any of those fields are not set.
          item.title = item.title || '';
          item.description = item.description || '';

          return item.title.match(regex) || item.description.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredItems: null
      };

    default:
      console.error('This should happen - itemReducer.js');
      return state;
  }
};
