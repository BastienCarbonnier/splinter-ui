import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from '@/app/hooks';
import { add } from '@/app/store/files-reducer';
import { clearMergedFile } from '@/app/store/merged-file-reducer';
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

function FileUploader({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();

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
          dispatch(clearMergedFile())
          dispatch(add(jsonFile))
        }
      };

      fileReader.readAsText(file, "UTF-8");
    });
  }
  return (
    <div>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" id="jsonFile" name="jsonFile" onChange={handleOnChange} accept="application/json" multiple/>
      </Button>
    </div>
  )
}

export default FileUploader;
