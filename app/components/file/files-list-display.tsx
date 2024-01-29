import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteFile, selectFiles } from '@/app/store/files-reducer';
import { clearMergedFile, setMergedFile } from '@/app/store/merged-file-reducer';
import { mergeFiles } from '@/app/services/splinter-api';

interface Props {
  files: IJsonFile[]
}

function FilesListDisplay({ files=[] }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectFiles);

  const handleDelete = (id: string) => {
    dispatch(deleteFile(id));
    dispatch(clearMergedFile())
  }

  const handleMergeFiles = async () => {
    try {
      const res = await mergeFiles(filesState.files)
      dispatch(setMergedFile(res.data))
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
    <div>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
              {files.map((file) => (
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
      {filesState.files.length > 1 && renderMergeButton()}
    </div>
  )
}

export default FilesListDisplay;