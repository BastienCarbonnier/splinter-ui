import { Button, Grid, Input, InputAdornment } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { exportData } from '@/app/utils/file.utils';

interface Props {
  file: IJsonFile
  title: string
  fileName?: string | null
}

function FileDownloaderButton({ file, fileName = null, title }: Props): JSX.Element {
  return (
    <>
      <Button component="label" variant="contained" fullWidth={true} startIcon={<DownloadIcon />} onClick={() => exportData(file, fileName)}>
        {title}
      </Button>
    </>
  )
}

export default FileDownloaderButton;