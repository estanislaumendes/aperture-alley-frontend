import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'typeface-roboto-slab';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context.jsx';

const theme = extendTheme({
  fonts: {
    body: 'Roboto Slab, serif',
    heading: 'Roboto Slab, serif',
    // Add more font styles if needed
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProviderWrapper>
        <Router>
          <App />
        </Router>
      </AuthProviderWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
