import { Box, Button, Grid, Input, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

interface Props {
  title: string
  file: IJsonFile
}

function FileDisplayJson({ file, title }: Props): JSX.Element {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box component="pre" sx={{ overflow: 'auto' }}>
        {JSON.stringify(file, null, 2)}
      </Box>
    </>
  )
}

export default FileDisplayJson;