import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';

import { FETCH_USER } from '../types';

const AuthState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(authReducer, initialState);

  const fetchUser = async () => {
    const res = await axios.get('/auth/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state,
        fetchUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
