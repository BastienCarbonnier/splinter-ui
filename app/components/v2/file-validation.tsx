import { useState } from 'react';
import FileUploaderV2 from './file-uploader-v2';
import { Alert, AlertColor, Button, Grid, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FilesListDisplayV2 from './files-list-display-v2';
import { useAppDispatch } from '@/app/hooks';
import { add, clearFiles, deleteFile, selectFiles } from '@/app/store/files-reducer';
import { clearMergedFile, selectMergedFile, setMergedFile } from '@/app/store/merged-file-reducer';
import { useSelector } from 'react-redux';
import { validateFiles } from '@/app/services/splinter-api';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
}

function FileValidation({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useSelector(selectFiles);
  const mergedFileState = useSelector(selectMergedFile)
  const [isValid, setIsValid] = useState(null);

  function handleFilesToVerify(file: IJsonFile) {
    dispatch(add(file));
  }
  function handleReferenceFile(file: IJsonFile) {
    dispatch(setMergedFile(file));
  }

  function handleFileDelete(file: IJsonFile) {
    dispatch(deleteFile(file.id))
  }
  const handleValidation = async () => {
    const jsons = filesState.files.map(file => file.json);
    const referenceFile = mergedFileState.mergedFile;
    if (jsons.length > 0 && referenceFile)
    try {
      const res = await validateFiles(jsons, referenceFile.json);
      setIsValid(res.data.isValid);
    } catch (err) {
      console.log(err);
    }
  };

  const renderValidationButton = (notDisabled: boolean): React.ReactNode => (
    <Button component="label" variant="contained" color='success' fullWidth={true} disabled={!notDisabled} onClick={() => {
      handleValidation();
    }}>
      Validate files</Button>
  );

  function handleClearAll() {
    dispatch(clearFiles());
    dispatch(clearMergedFile());
    setIsValid(null);
  }

  const renderValidationMessage = (): React.ReactNode => {
    const messageValid = 'Reference file contains all key/values of the bunch of files.';
    let icon = <CloseIcon fontSize="inherit" style={{ color: 'white' }} />;
    let message = 'Reference file is missing some key/values of the bunch of files.'
    let severity: AlertColor = 'error';
    if (isValid) {
      icon = <CheckIcon fontSize="inherit" style={{ color: 'white' }} />;
      message = messageValid;
      severity = 'success';
    }
    return (<Alert icon={icon} severity={severity} >{message}</Alert >);
  };

  return (
  <>
      <Grid container xs={12} md={12} justifyContent='center'>
        <Grid item xs={12} md={6}>
          {isValid != null && renderValidationMessage()}
        </Grid>
      </Grid>
      <Grid container gap={2} justifyContent="center" direction='row' marginTop='1em' md={6} marginX='auto'>
        <Grid item xs={12} md={5}>
          {renderValidationButton(filesState.files.length > 0 && mergedFileState.mergedFile != null)}
        </Grid>
        <Grid item xs={12} md={5}>
          <Button component="label" disabled={!(filesState.files.length > 0 || mergedFileState.mergedFile != null)}
                  variant="contained" 
                  color='error' 
                  fullWidth={true} startIcon={<DeleteIcon />} onClick={() => {
              handleClearAll();
            }}>
              Clear all files</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" marginBottom='1em' marginTop='1em'>
            Reference file
          </Typography>
          <FileUploaderV2 handleUploadedFile={handleReferenceFile} 
                          buttonText='Upload Reference file'
                          allowMultipleFile={false}></FileUploaderV2>
          {mergedFileState.mergedFile && <FilesListDisplayV2 files={[mergedFileState.mergedFile]} deletePossible={false}></FilesListDisplayV2>}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" marginBottom='1em' marginTop='1em'>
            Files to verify
          </Typography>
          <FileUploaderV2 handleUploadedFile={handleFilesToVerify}></FileUploaderV2>
          <FilesListDisplayV2 files={filesState.files} handleFileDelete={handleFileDelete}></FilesListDisplayV2>
        </Grid>
      </Grid>
  </>
  )
}

export default FileValidation;
