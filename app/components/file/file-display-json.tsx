import { Button, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { add, selectFile } from '@/app/store/file-reducer';

interface Props {
}

function FileDisplayJson({ }: Props): JSX.Element {
  const fileState = useAppSelector(selectFile);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(fileState.file, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "merged-file.json";

    link.click();
  };
  
  return (
    <div>
      <pre>{JSON.stringify(fileState.file, null, 2)}</pre>
      <Button component="label" variant="contained" startIcon={<DownloadIcon/>} onClick={() => {
        exportData();
      }}>
        Download merge file
      </Button>
    </div>
  )
}

export default FileDisplayJson;