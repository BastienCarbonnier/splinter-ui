import { Button, Grid, Input, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { convertFileToBlob, createZipWithUpdatedFiles } from '@/app/utils/file.utils';
import { FILE_EXTENSION_ZIP } from '@/app/constants/file.constant';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile | null
  zipName: string
  title: string
}

function FilesDownloaderButton({ files, mergedFile, zipName, title }: Props): JSX.Element {
  return (
    <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon />} onClick={() => {
      createZipWithUpdatedFiles(zipName, files, mergedFile);
    }}>
      {title}
    </Button>
  )
}

export default FilesDownloaderButton;