import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '@/app/hooks';
import { add } from '@/app/store/files-reducer';
import { v4 as uuidv4 } from 'uuid';

interface Props {
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

function FileInput({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    const fileReader = new FileReader();
    const { files } = target;

    fileReader.onload = function (event) {
      const jsonText = fileReader.result;

      if (jsonText) {
        const jsonFile: IJsonFile = {
          id: uuidv4(),
          name: files[0].name,
          json: JSON.parse(jsonText.toString())
        };
        dispatch(add(jsonFile))
      }
    };

    fileReader.readAsText(files[0], "UTF-8");
  }
  return (
    <div>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" id="jsonFile" name="jsonFile" onChange={handleOnChange} accept="application/json" />
      </Button>
    </div>
  )
}

export default FileInput;