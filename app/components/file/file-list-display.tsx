import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@/app/hooks';
import { remove } from '@/app/store/files-reducer';

interface Props {
  files: IJsonFile[]
}

function FileListDisplay({ files=[] }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(remove(id));
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