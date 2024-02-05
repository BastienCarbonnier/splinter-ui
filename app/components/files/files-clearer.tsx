import { Button } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { clearFiles } from '@/app/store/files-reducer';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearMergedFile } from '@/app/store/merged-file-reducer';

interface Props {
}

function FilesClearer({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleOnClick() {
    dispatch(clearFiles());
    dispatch(clearMergedFile());
  }
  return (
    <>
      <Button component="label" variant="contained" color='error' startIcon={<DeleteIcon />} fullWidth={true} onClick={() => {
        handleOnClick()
      }}>Clear files</Button>
    </>
  )
}

export default FilesClearer;