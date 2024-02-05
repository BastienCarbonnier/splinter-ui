import { Button, Grid, Input, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { convertFileToBlob, createZipWithUpdatedFiles } from '@/app/utils/file.utils';
import { FILE_EXTENSION_ZIP } from '@/app/constants/file.constant';
import FilesDownloaderButton from './files-downloader-button';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile | null
}

function FilesDownloader({ files, mergedFile }: Props): JSX.Element {
  const [downloadZipName, setDownloadZipName] = useState('all_updated_files');

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Input value={downloadZipName} fullWidth={true} endAdornment={<InputAdornment disableTypography position="end">
            {FILE_EXTENSION_ZIP}</InputAdornment>} onChange={(event) => setDownloadZipName(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <FilesDownloaderButton files={files} mergedFile={mergedFile} title='Export' zipName={downloadZipName}></FilesDownloaderButton>
        </Grid>
      </Grid>
    </>
  )
}

export default FilesDownloader;