import { Button, Grid, Input, InputAdornment, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { useAppSelector } from '@/app/hooks';
import { selectUpdatedFiles } from '@/app/store/files-reducer';
import { selectMergedFile } from '@/app/store/merged-file-reducer';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile | null
}

function FilesDownloader({ files, mergedFile }: Props): JSX.Element {
  const [downloadZipName, setDownloadZipName] = useState('all_updated_files');
  const fileExtension = '.zip';

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
      saveAs(content, `${downloadZipName}${fileExtension}`);
    });
  };

  const convertFileToBlob = (file: IJsonFile): Blob => {
    const str = JSON.stringify(file, null, 4);
    const bytes = new TextEncoder().encode(str);
    return new Blob([bytes], {
      type: "application/json;charset=utf-8"
    });
  };

  return (
    <>
      <Grid container spacing={2} marginBottom='3rem'>
        <Grid item xs={6}>
          <Input value={downloadZipName} fullWidth={true} endAdornment={<InputAdornment disableTypography position="end">
            {fileExtension}</InputAdornment>} onChange={(event) => setDownloadZipName(event.target.value)} />
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