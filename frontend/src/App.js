import React, {useReducer} from 'react';

import './global.css';

import Routes from './routes';

export const AuthContext = React.createContext();

const initialState = {
  ongId: localStorage.getItem('ongId') ? localStorage.getItem('ongId') : null,
  ongName: localStorage.getItem('ongName') ? localStorage.getItem('ongName') : null,
  token: localStorage.getItem('@Hero-token') ? localStorage.getItem('@Hero-token') : null,
  auth: sessionStorage.getItem('auth') === 'true' ? true : false
};


function reducer(state, action) {
  switch(action.type) {
    case 'LOGIN':
      localStorage.setItem('ongId', action.payload.ong.id);
      localStorage.setItem('ongName', action.payload.ong.name);
      localStorage.setItem('@Hero-token', action.payload.token);
      sessionStorage.setItem('auth', 'true');

      return {
        ongId: action.payload.ong.id,
        ongName: action.payload.ong.name,
        auth: action.payload.auth,
        token: action.payload.token
      };

    case 'LOGOUT':
      localStorage.clear();
      
      return {
        ongId: null,
        ongName: null,
        auth: false,
        token: null
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Routes />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
