import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  handleUploadedFile: (file: IJsonFile) => void
  buttonText?: string
  disabledUpload ?: boolean
  allowMultipleFile ?: boolean
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function FileUploaderV2({ handleUploadedFile, buttonText = 'Upload file(s)', disabledUpload = false, allowMultipleFile = true }: Props): JSX.Element {

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    const { files } = target;

    Array.from(files).forEach(file => {
      const fileReader = new FileReader();

      fileReader.onload = function () {
        const jsonText = fileReader.result;
        if (jsonText) {
          const jsonFile: IJsonFile = {
            id: uuidv4(),
            name: file.name,
            json: JSON.parse(jsonText.toString())
          };

          handleUploadedFile(jsonFile);
        }
        target.value = '';
      };

      fileReader.readAsText(file, "UTF-8");
    });
  }
  return (
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth={true} disabled={disabledUpload}>
      {buttonText}
      <VisuallyHiddenInput type="file" id="jsonFile" name="jsonFile" onChange={(event) => handleOnChange(event)} accept="application/json" multiple={allowMultipleFile}/>
    </Button>
  )
}

export default FileUploaderV2;
