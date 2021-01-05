import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignUp';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
