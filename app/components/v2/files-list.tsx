import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteFile, selectFiles, setUpdatedFiles, updateAllFiles } from '@/app/store/files-reducer';
import { clearMergedFile, selectMergedFile, setMergedFile } from '@/app/store/merged-file-reducer';
import { mergeFilesAndRemoveCommonKeys } from '@/app/services/splinter-api';

interface Props {
}

function FilesList({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectFiles);
  const mergedFileState = useAppSelector(selectMergedFile);

  const handleDelete = (id: string) => {
    dispatch(deleteFile(id));
    dispatch(clearMergedFile())
  }

  const handleMergeFiles = async () => {
    try {
      const res = await mergeFilesAndRemoveCommonKeys(filesState.files)
      console.log(res)
      dispatch(setMergedFile(res.data.mergedFile))
      dispatch(setUpdatedFiles(res.data.files))
    } catch (err) {
      console.log(err);
    }
  };

  const renderMergeButton = (): React.ReactNode => (
    <Button component="label" variant="contained" onClick={() => {
      handleMergeFiles();
    }}>Merge files</Button>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {filesState.files.map((file) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" size="medium" color="default"
                    onClick={() => {
                      handleDelete(file.id);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                }
                key={file.id}
              >
                <ListItemAvatar>
                  <Avatar>
                    <InsertDriveFileIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.name}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
      { filesState.files.length > 1 && renderMergeButton() }
    </>
  )
}

export default FilesList;