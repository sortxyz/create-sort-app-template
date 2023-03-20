import React, { useState } from 'react';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SQLQuery from './components/Contract/SQLQuery';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div class="sort-loading">
        <img src="/img/sort-loading.gif" />
      </div>
      <div class="get-started">
        <a href="https://docs.sort.xyz" target="_blank">Get Started</a> with Sort Components
      </div>
    
    </ThemeProvider>
  );
}

export default App;
