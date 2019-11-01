import React, { useReducer } from 'react';
import axios from 'axios';
import itemContext from './itemContext';
import itemReducer from './itemReducer';

import { GET_ITEMS, ADD_ITEM } from '../types';

const ItemState = props => {
  const initialState = {
    items: []
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get('/api/items');
      dispatch({ type: GET_ITEMS, payload: res.data });
    } catch (err) {
      console.error('Get Items error');
    }
  };

  // Add Item
  const addItem = async item => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/items', item, config);
      dispatch({ type: ADD_ITEM, payload: res.data });
    } catch (err) {
      console.error('Add Item error');
    }
  };

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        getItems,
        addItem
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
