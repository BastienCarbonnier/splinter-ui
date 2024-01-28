import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
  file: IJsonFile
}

function FileDisplayJson({ file }: Props): JSX.Element {
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(file, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "merged-file.json";

    link.click();
  };
  
  return (
    <div>
      <pre>{JSON.stringify(file, null, 2)}</pre>
      <Button component="label" variant="contained" startIcon={<DownloadIcon/>} onClick={() => {
        exportData();
      }}>
        Download merge file
      </Button>
    </div>
  )
}

export default FileDisplayJson;