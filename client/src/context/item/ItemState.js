import React, { useReducer } from "react";
import axios from "axios";
import itemContext from "./itemContext";
import itemReducer from "./itemReducer";

import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_FILTER
} from "../types";

const ItemState = props => {
  const initialState = {
    items: [],
    filter: "",
    current: null,
    loading: true
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get(`/api/items?q=${state.filter}`);
      dispatch({ type: GET_ITEMS, payload: res.data });
    } catch (err) {
      console.error("Get Items error");
    }
  };

  // Add Item
  const addItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/items", item, config);
      dispatch({ type: ADD_ITEM, payload: res.data });
    } catch (err) {
      console.error("Add Item error", err);
    }
  };

  // Update Item
  const updateItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);
      dispatch({ type: UPDATE_ITEM, payload: res.data });
    } catch (err) {
      console.error("Update Item error", err);
    }
  };

  // Delete Item
  const deleteItem = async id => {
    try {
      const res = await axios.delete(`/api/items/${id}`);
      console.log(`Deleting item: ${id}`, res.data);
      dispatch({ type: DELETE_ITEM, payload: id });
    } catch (err) {
      console.error("Delete Item error");
    }
  };

  // Set Current Item
  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // Clear Current Item
  const clearCurrent = item => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Set Search Filter
  const setFilter = query => {
    dispatch({ type: SET_FILTER, payload: query });
  };

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        filter: state.filter,
        loading: state.loading,
        current: state.current,
        getItems,
        addItem,
        updateItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        setFilter
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default ItemState;
