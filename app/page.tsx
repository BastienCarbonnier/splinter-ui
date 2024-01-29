"use client"
import styles from './page.module.css'

import { Provider } from 'react-redux';
import { store } from './store';

import Container from '@mui/material/Container';
import Dashboard from './components/dashboard';
import { ThemeProvider, Typography, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <main className={styles.main}>
          <Container>
            <main>
              <Typography variant="h3" gutterBottom>
                Splinter
              </Typography>
              <Dashboard/>
            </main>
          </Container>
        </main>
      </Provider>
    </ThemeProvider>
  )
}
