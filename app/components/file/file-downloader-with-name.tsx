import { Button, Grid, Input, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { exportData } from '@/app/utils/file.utils';
import { FILE_EXTENSION_JSON } from '@/app/constants/file.constant';
import FileDownloaderButton from './file-downloader-button';

interface Props {
  file: IJsonFile
  buttonTitle: string
  defaultFileName?: string | null 
}

function FileDownloaderWithName({ file, buttonTitle, defaultFileName = null }: Props): JSX.Element {
  const [ downloadFileName, setDownloadFileName ] = useState<string | null>(defaultFileName);
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input value={downloadFileName} fullWidth={true} onChange={(event) => setDownloadFileName(event.target.value)} endAdornment={<InputAdornment disableTypography position="end">
            {FILE_EXTENSION_JSON}</InputAdornment>} />
        </Grid>
        <Grid item xs={6}>
          <FileDownloaderButton file={file} fileName={downloadFileName} title={buttonTitle}></FileDownloaderButton>
          <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon/>} onClick={() => exportData(file, downloadFileName)}>
            {}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FileDownloaderWithName;