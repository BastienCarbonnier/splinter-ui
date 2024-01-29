"use client"
import { CssBaseline, Divider, Grid, Link, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import FileUploader from '../components/file/file-uploader';
import FilesClearer from '../components/file/files-clearer';
import { Provider } from 'react-redux';
import { store } from '../store';
import FilesList from '../components/v2/files-list';
import FilesUpdatedList from '../components/v2/files-updated-list';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function V2() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              File merger version 2
            </Typography>
          </Grid>
          <Grid item xs={6} margin='auto' textAlign='right'><Link href='/' fontSize='2em'>Go to v1</Link></Grid>
        </Grid>  
        <Grid container spacing={2} direction='column'>
          <Grid item xs={6}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <FileUploader/>
              <FilesClearer />
            </Stack>
            <FilesList></FilesList>
          </Grid>
          <Grid item>
            <FilesUpdatedList></FilesUpdatedList>
          </Grid>
        </Grid>

        
      </Provider>

    </ThemeProvider>
  )
}
