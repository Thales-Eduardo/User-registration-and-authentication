import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './style/global';
import Router from './routes/index';
import AppProvider from './hooks/index';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
