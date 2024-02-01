"use client"
import { Divider, Grid, Stack, Typography } from '@mui/material';
import FilesClearer from './file/files-clearer';
import FileUploader from './file/file-uploader';
import FilesList from './v2/files-list';
import FilesUpdatedList from './v2/files-updated-list';
import { useAppSelector } from '../hooks';
import { selectUpdatedFiles } from '../store/files-reducer';
import { selectMergedFile } from '../store/merged-file-reducer';

export default function Dashboard() {
  const filesState = useAppSelector(selectUpdatedFiles);
  const mergedFileState = useAppSelector(selectMergedFile);
  return (
    <>
      <Grid container columnSpacing={10}>
        <Grid item md={6} xs={12}>
          <Stack
            width='100%'
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={4}
          >
            <FileUploader />
            <FilesClearer />
          </Stack>
          <FilesList></FilesList>
        </Grid>
        <Grid item md={6} xs={12}>
          <FilesUpdatedList files={filesState.updatedFiles} mergedFile={mergedFileState.mergedFile}></FilesUpdatedList>
        </Grid>
      </Grid>
    </>
  )
}
