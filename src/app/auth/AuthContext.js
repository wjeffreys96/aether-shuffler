"use client"
import React, { createContext, useReducer } from 'react';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  test: 'test',
};

// reducer for updating the state
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    // test action
    case 'TEST':
      console.log('authContext test ', action.payload)
      return {
        ...state,
        test: 'test',
      };

    default:
      return state;
  }
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // login action
  const login = (user, token) => {
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  // logout action
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const authContextValue = {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    token: state.token,
    login,
    logout,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};