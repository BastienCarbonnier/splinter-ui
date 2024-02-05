import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearFiles, selectFiles } from '@/app/store/files-reducer';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearMergedFile } from '@/app/store/merged-file-reducer';

interface Props {
}

function FilesClearer({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectFiles);

  function handleOnClick() {
    dispatch(clearFiles());
    dispatch(clearMergedFile());
  }
  return (
    <>
      <Button component="label" variant="contained" color='error' startIcon={<DeleteIcon />} fullWidth={true} disabled={filesState.files.length == 0} onClick={() => {
        handleOnClick()
      }}>Clear files</Button>
    </>
  )
}

export default FilesClearer;