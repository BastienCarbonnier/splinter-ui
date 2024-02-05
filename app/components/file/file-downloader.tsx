import { Button, Grid, Input, InputAdornment, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { exportData } from '@/app/utils/file.utils';
import { FILE_EXTENSION_JSON } from '@/app/constants/file.constant';

interface Props {
  file: IJsonFile
}

function FileDownloader({ file }: Props): JSX.Element {
  const [ downloadFileName, setDownloadFileName ] = useState('merged_file');
  
  return (
    <>
      <Grid container spacing={2} marginBottom='3rem'>
        <Grid item xs={6}>
          <Input value={downloadFileName} fullWidth={true} onChange={(event) => setDownloadFileName(event.target.value)} endAdornment={<InputAdornment disableTypography position="end">
            {FILE_EXTENSION_JSON}</InputAdornment>} />
        </Grid>
        <Grid item xs={6}>
          <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon/>} onClick={() => exportData(file)}>
            Download merge file
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FileDownloader;