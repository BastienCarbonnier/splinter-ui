"use client"
import { Grid, Input, Button, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';
import { selectFile } from '../store/merged-file-reducer';
import FileDisplayJson from './file/file-display-json';
import FileUploader from './file/file-uploader';

export default function Dashboard() {
  const mergedFileState = useAppSelector(selectFile);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        File merger
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FileUploader />
        </Grid>
        <Grid item xs={6}>
          {mergedFileState.mergedFile && <FileDisplayJson file={mergedFileState.mergedFile.json} title='Merged files'></FileDisplayJson>}
        </Grid>
      </Grid>
    </>
  )
}
