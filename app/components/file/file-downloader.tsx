import { Button, Grid, Input, InputAdornment, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

interface Props {
  file: IJsonFile
}

function FileDownloader({ file }: Props): JSX.Element {
  const [ downloadFileName, setDownloadFileName ] = useState('merged_file');
  const fileExtension = '.json';
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(file.json, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${downloadFileName}.json`;

    link.click();
  };
  
  return (
    <>
      <Grid container spacing={2} marginBottom='3rem'>
        <Grid item xs={6}>
          <Input value={downloadFileName} fullWidth={true} onChange={(event) => setDownloadFileName(event.target.value)} endAdornment={<InputAdornment disableTypography position="end">
            {fileExtension}</InputAdornment>} />
        </Grid>
        <Grid item xs={6}>
          <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon/>} onClick={() => {
            exportData();
          }}>
            Download merge file
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FileDownloader;