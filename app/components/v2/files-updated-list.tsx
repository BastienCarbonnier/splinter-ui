import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useAppSelector } from '@/app/hooks';
import { selectUpdatedFiles } from '@/app/store/files-reducer';
import DownloadIcon from '@mui/icons-material/Download';
import { selectMergedFile } from '@/app/store/merged-file-reducer';
import FileDownloader from '../file/file-downloader';
import FileModalPreview from '../file/file-modal-preview';
import FilesDownloader from '../file/files-downloader';

interface Props {
}

function FilesUpdatedList({ }: Props): JSX.Element {
  const filesState = useAppSelector(selectUpdatedFiles);
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
            <FilesDownloader files={filesState.updatedFiles} mergedFile={mergedFileState.mergedFile}></FilesDownloader>
          </Grid>
        </Grid>
        <Typography variant="h6">
          Merged file
        </Typography>
        <FileDownloader file={mergedFileState.mergedFile}></FileDownloader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List sx={{ width: '100%' }}>
              {filesState.updatedFiles.map((file) => (
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