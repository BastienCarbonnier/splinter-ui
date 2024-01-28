import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteFile, selectFiles } from '@/app/store/files-reducer';
import { init } from '@/app/store/merged-file-reducer';

interface Props {
  files: IJsonFile[]
}

function FileListDisplay({ files=[] }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectFiles);

  const handleDelete = (id: string) => {
    dispatch(deleteFile(id));
    if (filesState.files.length <= 2) {
      dispatch(init());
    }
  }

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
                  key={file.name}
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
    </div>
  )
}

export default FileListDisplay;