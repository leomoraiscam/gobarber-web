import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Leonardo' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
