import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Initial State
const initialState = {
  username: localStorage.getItem('username') || 'Guest',
  isLoggedIn: !!localStorage.getItem('token'),
  userId: localStorage.getItem('userId') || '',
  email: localStorage.getItem('email') || '',
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
  phoneNumber: localStorage.getItem('phoneNumber') || '',
  theme: localStorage.getItem('theme') || 'light',
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: true,
        userId: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phoneNumber: action.payload.phoneNumber,
      };
    case 'LOGOUT':
      return {
        ...state,
        username: 'Guest',
        isLoggedIn: false,
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phoneNumber: action.payload.phoneNumber,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SYNC_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Create the Context
const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize state from localStorage on app load
  useEffect(() => {
    const savedState = {
      username: localStorage.getItem('username') || 'Guest',
      isLoggedIn: !!localStorage.getItem('token'),
      userId: localStorage.getItem('userId') || '',
      email: localStorage.getItem('email') || '',
      firstName: localStorage.getItem('firstName') || '',
      lastName: localStorage.getItem('lastName') || '',
      phoneNumber: localStorage.getItem('phoneNumber') || '',
      theme: localStorage.getItem('theme') || 'light',
    };
    dispatch({ type: 'SYNC_STATE', payload: savedState });
  }, []);

  // Save only the changed parts of the state to localStorage
  useEffect(() => {
    if (state.username !== initialState.username) {
      localStorage.setItem('username', state.username);
    }
    if (state.isLoggedIn !== initialState.isLoggedIn) {
      state.isLoggedIn
        ? localStorage.setItem('token', 'example-token') // Replace with actual token
        : localStorage.removeItem('token');
    }
    if (state.userId !== initialState.userId) {
      localStorage.setItem('userId', state.userId);
    }
    if (state.email !== initialState.email) {
      localStorage.setItem('email', state.email);
    }
    if (state.firstName !== initialState.firstName) {
      localStorage.setItem('firstName', state.firstName);
    }
    if (state.lastName !== initialState.lastName) {
      localStorage.setItem('lastName', state.lastName);
    }
    if (state.phoneNumber !== initialState.phoneNumber) {
      localStorage.setItem('phoneNumber', state.phoneNumber);
    }
    if (state.theme !== initialState.theme) {
      localStorage.setItem('theme', state.theme);
    }
  }, [state]);

  // Function to update the global state with only the changed parts
  // Update the updateGlobalState function
const updateGlobalState = (updatedState) => {
  const changes = {};
  for (const key in updatedState) {
    if (updatedState[key] !== state[key]) {
      changes[key] = updatedState[key];
    }
  }
  if (Object.keys(changes).length > 0) {
    dispatch({ type: 'SYNC_STATE', payload: changes });
  }
};

  return (
    <GlobalContext.Provider
      value={{
        state,
        updateGlobalState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook to use the Global Context
export const useGlobal = () => useContext(GlobalContext);