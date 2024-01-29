import { Button, Grid, Input, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

interface Props {
  title: string
  file: IJsonFile
}

function FileDisplayJson({ file, title }: Props): JSX.Element {
  const [ downloadFileName, setDownloadFileName ] = useState('merged_file');
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(file, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${downloadFileName}.json`;

    link.click();
  };
  
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <pre>{JSON.stringify(file, null, 2)}</pre>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input value={downloadFileName} onChange={(event) => setDownloadFileName(event.target.value)} />.json
        </Grid>
        <Grid item xs={12}>
          <Button component="label" variant="contained" startIcon={<DownloadIcon />} onClick={() => {
            exportData();
          }}>
            Download merge file
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FileDisplayJson;