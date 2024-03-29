"use client"
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import FilesClearer from '../components/files/files-clearer';
import FilesUpdated from '../components/files/files-updated';
import { useAppDispatch, useAppSelector } from '../hooks';
import { add, deleteFile, selectUpdatedFiles, setUpdatedFiles } from '../store/files-reducer';
import { selectMergedFile, setMergedFile } from '../store/merged-file-reducer';
import FilesList from '../components/files/files-list';
import { mergeFilesAndRemoveCommonKeys, mergeFilesAndRemoveCommonKeysAllBrandFiles } from '../services/splinter-api';
import { createZipFilesForAllBrands } from '../utils/file.utils';
import MergeIcon from '@mui/icons-material/Merge';
import FileUploader from '../components/file/file-uploader';
import { setIsLoading } from '../store/loader-reducer';
import Loader from '../components/layout/loader';

export default function FilesMerger() {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectUpdatedFiles);
  const mergedFileState = useAppSelector(selectMergedFile);

  function handleUploadedFiles(file: IJsonFile) {
    dispatch(add(file));
  }

  function handleFileDelete(file: IJsonFile) {
    dispatch(deleteFile(file.id));
  }

  const handleMergeFiles = async () => {
    try {
      const res = await mergeFilesAndRemoveCommonKeys(filesState.files)
      console.log(res)
      dispatch(setMergedFile(res.data.mergedFile))
      dispatch(setUpdatedFiles(res.data.files))
    } catch (err) {
      console.log(err);
    }
  };

  const handleAllFilesMerge = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await mergeFilesAndRemoveCommonKeysAllBrandFiles(filesState.files);
      dispatch(setIsLoading(false))
      console.log(res.data)
      createZipFilesForAllBrands(res.data);
    } catch (err) {
      dispatch(setIsLoading(false))
      console.log(err);
    }
  }

  const renderMergeButton = (): React.ReactNode => (
    <Button component="label" variant="contained" startIcon={<MergeIcon />} fullWidth={true} onClick={() => {
      handleMergeFiles();
    }}>
      Merge files</Button>
  );

  const renderAllI18nFilesButton = (): React.ReactNode => (
    <>
      <Button component="label" variant="contained" color='success' startIcon={<MergeIcon />} fullWidth={true} onClick={() => {
        handleAllFilesMerge();
      }}>
        Create zip with separate files
      </Button>
    </>
  );

  return (
    <>
      <Grid container columnSpacing={10}>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" marginBottom='1.5em'>
            Files uploader
          </Typography>
          <Stack
            width='100%'
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={4}
          >
            <FileUploader handleUploadedFile={handleUploadedFiles}></FileUploader>
            <FilesClearer />
          </Stack>

          <FilesList files={filesState.files} handleFileDelete={handleFileDelete}></FilesList>
        </Grid>
        <Grid item md={6} xs={12}>
          { mergedFileState.mergedFile && <FilesUpdated files={filesState.updatedFiles} mergedFile={mergedFileState.mergedFile}></FilesUpdated>}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={12}>
          {filesState.files.length > 1 && renderMergeButton()}
        </Grid>
        <Grid item md={12}>
          {filesState.files.length > 1 && renderAllI18nFilesButton()}
        </Grid>
      </Grid>
    </>
  )
}
