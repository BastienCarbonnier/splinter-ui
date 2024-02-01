import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFiles } from '@/app/store/files-reducer';
import FileModalPreview from '../file/file-modal-preview';
import { exportData } from '@/app/utils/file.utils';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
  files: IJsonFile[]
  handleFileDelete?: (file: IJsonFile) => void
  deletePossible?: boolean
}

function FilesListDisplayV2({ files, handleFileDelete, deletePossible = true }: Props): JSX.Element {
  const handleDelete = (file: IJsonFile) => {
    handleFileDelete?.(file)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List sx={{ width: '100%' }}>
          {files.map((file) => (
            <ListItem
              secondaryAction={
                <>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <FileModalPreview file={file}></FileModalPreview>
                    <IconButton edge="end" aria-label="export" size="medium" color="default"
                      onClick={() => {
                        exportData(file);
                      }}>
                      <DownloadIcon />
                    </IconButton>
                    { deletePossible &&
                      <IconButton edge="end" aria-label="delete" size="medium" color="default"
                        onClick={() => {
                          handleDelete(file);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  </Stack>
                </>
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
  )
}

export default FilesListDisplayV2;