import { Button } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { clearFiles } from '@/app/store/files-reducer';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
}

function FilesClearer({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function handleOnClick() {
    dispatch(clearFiles());
  }
  return (
    <>
      <Button component="label" variant="contained" startIcon={<DeleteIcon />} onClick={() => {
        handleOnClick()
      }}>Clear files</Button>
    </>
  )
}

export default FilesClearer;