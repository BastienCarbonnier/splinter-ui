import { Box, IconButton, Modal, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState } from 'react';
import FileDisplayJson from './file-display-json';

interface Props {
  file: IJsonFile
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '70vh',
  maxWidth: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

function FileModalPreview({ file }: Props): JSX.Element {
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
          <FileDisplayJson file={file.json} title='Preview'></FileDisplayJson>
        </Box>
      </Modal>
    </>
  )
}

export default FileModalPreview;