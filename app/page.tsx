"use client"
import styles from './page.module.css'
import { Provider } from 'react-redux';
import { store } from './store';
import Container from '@mui/material/Container';
import { Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Header from './components/layout/header';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/merger');
  }, []);
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Header></Header>
        <main className={styles.main}>
          <Container>
            <Grid container alignItems='center' marginTop='64px'>
              <Grid item xs={12}>
                <Typography variant="h3" marginBottom='1em' marginTop='1em'>
                  Home
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Welcome to splinter a merger and validation tool for Json files.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </main>
      </Provider>
    </ThemeProvider>
  )
}
