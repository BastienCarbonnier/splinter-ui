"use client"
import { Container, CssBaseline, Divider, Grid, Link, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import FileUploader from '../components/file/file-uploader';
import FilesClearer from '../components/file/files-clearer';
import { Provider } from 'react-redux';
import { store } from '../store';
import FilesList from '../components/v2/files-list';
import FilesUpdatedList from '../components/v2/files-updated-list';
import FileUploaderV2 from '../components/v2/file-uploader-v2';
import FileValidation from '../components/v2/file-validation';

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
        <Container>
          <CssBaseline />
          <Grid container alignItems='center'>
            <Grid item xs={6}>
              <Typography variant="h3" marginBottom='1em' marginTop='1em'>
                Validation tool
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign='end'><Link href='/'>Go to file merger page</Link></Grid>
          </Grid>  

          <FileValidation></FileValidation>
        </Container>
      </Provider>
    </ThemeProvider>
  )
}
