"use client"
import { Divider, Grid, Stack, Typography } from '@mui/material';
import FilesClearer from './file/files-clearer';
import FileUploader from './file/file-uploader';
import FilesList from './v2/files-list';
import FilesUpdatedList from './v2/files-updated-list';

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        File merger
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <FileUploader />
            <FilesClearer />
          </Stack>
          <FilesList></FilesList>
        </Grid>
        <Grid item xs={6}>
          <FilesUpdatedList></FilesUpdatedList>
        </Grid>
      </Grid>
    </>
  )
}
