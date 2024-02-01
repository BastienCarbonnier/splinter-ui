"use client"
import styles from './page.module.css'

import { Provider } from 'react-redux';
import { store } from './store';

import Container from '@mui/material/Container';
import Dashboard from './components/dashboard';
import { AppBar, Box, Button, Divider, Drawer, Grid, IconButton, Link, List, ListItem, ListItemButton, ListItemText, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Header from './components/header';

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
        <Header></Header>
        <main className={styles.main}>
          <Container>
            <Grid container alignItems='center' marginTop='64px'>
              <Grid item xs={12}>
                <Typography variant="h3" marginBottom='1em' marginTop='1em'>
                  File merger
                </Typography>
              </Grid>
            </Grid>  
            <Dashboard/>
          </Container>
        </main>
      </Provider>
    </ThemeProvider>
  )
}
