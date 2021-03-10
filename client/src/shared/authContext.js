import { createContext } from 'react';

//creating the context to maintain user information
const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName : null,
  token: null,
  openedModal: null,
  login: () => {},
  logout: () => {},
  openModal: () => {}
});

export default AuthContext;