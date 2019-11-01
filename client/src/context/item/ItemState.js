import React, { useReducer } from 'react';
import axios from 'axios';
import itemContext from './itemContext';
import itemReducer from './itemReducer';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../types';

const ItemState = props => {
  const initialState = {
    items: [],
    loading: true
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

  // Delete Item
  const deleteItem = async id => {
    try {
      const res = await axios.delete(`/api/items/${id}`);
      console.log(`Deleting item: ${id}`, res.data);
      dispatch({ type: DELETE_ITEM, payload: id });
    } catch (err) {
      console.error('Delete Item error');
    }
  };

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        getItems,
        addItem,
        deleteItem
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
