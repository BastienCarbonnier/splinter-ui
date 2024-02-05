import { Button, Grid, Input, InputAdornment, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { useAppSelector } from '@/app/hooks';
import { selectUpdatedFiles } from '@/app/store/files-reducer';
import { selectMergedFile } from '@/app/store/merged-file-reducer';
import { convertFileToBlob } from '@/app/utils/file.utils';
import { FILE_EXTENSION_ZIP } from '@/app/constants/file.constant';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile | null
}

function FilesDownloader({ files, mergedFile }: Props): JSX.Element {
  const [downloadZipName, setDownloadZipName] = useState('all_updated_files');

  const exportData = () => {
    const zip = new JSZip();

    const zipFolder = zip.folder(downloadZipName);
    if (mergedFile) {
      zipFolder?.file('common_keys_value.json', convertFileToBlob(mergedFile.json), { base64: true });
    }
    const filesFolder = zipFolder?.folder('updated_files');
  
    files.forEach((file) => {
      filesFolder?.file(file.name, convertFileToBlob(file.json), { base64: true });
    })

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `${downloadZipName}${FILE_EXTENSION_ZIP}`);
    });
  };

  return (
    <>
      <Grid container spacing={2} marginBottom='3rem'>
        <Grid item xs={6}>
          <Input value={downloadZipName} fullWidth={true} endAdornment={<InputAdornment disableTypography position="end">
            {FILE_EXTENSION_ZIP}</InputAdornment>} onChange={(event) => setDownloadZipName(event.target.value)} />
        </Grid>
        <Grid item xs={6}>
          <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon />} onClick={() => {
            exportData();
          }}>
            Export
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FilesDownloader;