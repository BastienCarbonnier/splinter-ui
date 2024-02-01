"use client"
import styles from './page.module.css'

import { Provider } from 'react-redux';
import { store } from './store';

import Container from '@mui/material/Container';
import Dashboard from './components/dashboard';
import { Grid, Link, ThemeProvider, Typography, createTheme } from '@mui/material';
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
            <Grid container alignItems='center'>
              <Grid item xs={6}>
                <Typography variant="h3" marginBottom='1em' marginTop='1em'>
                  File merger
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign='end'><Link href='/validation'>Go to validation page</Link></Grid>
            </Grid>  
            <Dashboard/>
          </Container>
        </main>
      </Provider>
    </ThemeProvider>
  )
}
