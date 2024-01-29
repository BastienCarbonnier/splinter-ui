"use client"
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';
import { selectMergedFile } from '../store/merged-file-reducer';
import FileDisplayJson from './file/file-display-json';
import FileDownloader from './file/file-downloader';
import FilesClearer from './file/files-clearer';
import FilesListDisplay from './file/files-list-display';
import { selectFiles } from '../store/files-reducer';
import FileUploader from './file/file-uploader';

export default function Dashboard() {
  const mergedFileState = useAppSelector(selectMergedFile);
  const filesState = useAppSelector(selectFiles);
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
            <FileUploader/>
            <FilesClearer />
          </Stack>

          <FilesListDisplay></FilesListDisplay>
        </Grid>
        {
          mergedFileState.mergedFile &&
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                Results
              </Typography>
              <FileDownloader file={mergedFileState.mergedFile} />
              <FileDisplayJson file={mergedFileState.mergedFile.json} title='Preview'></FileDisplayJson>
            </Grid>
        }
      </Grid>
    </>
  )
}
