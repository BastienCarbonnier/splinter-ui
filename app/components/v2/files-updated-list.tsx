import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloader from '../file/file-downloader';
import FileModalPreview from '../file/file-modal-preview';
import FilesDownloader from '../file/files-downloader';
import { exportData } from '@/app/utils/file.utils';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile | null
}

function FilesUpdatedList({ files, mergedFile }: Props): JSX.Element {
  return (
    <>
    {
      mergedFile && 
      <>
        <Typography variant="h5" marginBottom='1.5em'>
          Updated files
        </Typography>
        <Grid container spacing={2} flexDirection='column'>
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Files export
            </Typography>
          </Grid>
          <Grid item>
            <FilesDownloader files={files} mergedFile={mergedFile}></FilesDownloader>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography variant="h6">
            Merged file
          </Typography>
          <FileModalPreview file={mergedFile}></FileModalPreview>
        </Stack>
        <FileDownloader file={mergedFile}></FileDownloader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <List sx={{ width: '100%', maxHeight: '20em', overflow: 'auto' }}>
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
      </>
  }
    </>
  )
}

export default FilesUpdatedList;