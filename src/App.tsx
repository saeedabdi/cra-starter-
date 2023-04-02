import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'routes/AppRouter';
const useStyles = createUseStyles({
  '@global': {
    body: {
      fontFamily: 'Roboto, sans-serif',
    },
  },
});
function App() {
  useStyles();
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
