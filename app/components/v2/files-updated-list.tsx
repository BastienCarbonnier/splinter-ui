import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFiles } from '@/app/store/files-reducer';


import DownloadIcon from '@mui/icons-material/Download';
import { selectMergedFile } from '@/app/store/merged-file-reducer';
import FileDownloader from '../file/file-downloader';

interface Props {
}

function FilesUpdatedList({ }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const filesState = useAppSelector(selectFiles);

  const mergedFileState = useAppSelector(selectMergedFile);

  const exportData = (file: IJsonFile | null) => {
    if (file) {
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(file?.json, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = file.name;

      link.click();
    }
  };

  return (
    <>
    {
      mergedFileState.mergedFile && 
      <div>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <Typography variant="h5" gutterBottom>
                Merged file
              </Typography>
              <FileDownloader file={mergedFileState.mergedFile}></FileDownloader>

              <Typography variant="h5" gutterBottom>
                Updated files
              </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List sx={{ width: '100%', maxWidth: 360 }}>
                {filesState.files.map((file) => (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="export" size="medium" color="default"
                        onClick={() => {
                          exportData(file);
                        }}>
                        <DownloadIcon />
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
      </div>
  }
    </>
  )
}

export default FilesUpdatedList;