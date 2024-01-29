import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState } from 'react';
import FileDisplayJson from './file/file-display-json';

interface Props {
  file: IJsonFile
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

function ModalPreview({ file }: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }
  return (
    <>
      <IconButton edge="end" aria-label="preview" size="medium" color="default" onClick={handleOpen}>
        <VisibilityOutlinedIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FileDisplayJson file={file} title='Preview'></FileDisplayJson>
        </Box>
      </Modal>
    </>
  )
}

export default ModalPreview;