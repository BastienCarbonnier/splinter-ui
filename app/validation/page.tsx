"use client"
import { Container, CssBaseline, Grid, Link, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../store';
import FileValidation from '../components/v2/file-validation';
import Header from '../components/header';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'green',
          color: 'white',
          icon: {
            color: 'white'
          }
        },
        standardError: {
          backgroundColor: '#f44336',
          color: 'white',
          icon: {
            color: 'white'
          }
        },
        standardWarning: {
          backgroundColor: 'orange',
          color: 'white',
          icon: {
            color: 'white'
          }
        },
        standardInfo: {
          backgroundColor: 'grey',
          color: 'black',
          icon: {
            color: 'white'
          }
        }
      }
    },
  }
});

export default function Validation() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Header></Header>
        <Container>
          <CssBaseline />
          <Grid container alignItems='center' marginTop='64px'>
            <Grid item xs={12}>
              <Typography variant="h3" marginBottom='1em' marginTop='1em'>
                Validation tool
              </Typography>
            </Grid>
          </Grid>  

          <FileValidation></FileValidation>
        </Container>
      </Provider>
    </ThemeProvider>
  )
}
