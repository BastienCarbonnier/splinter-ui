import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteFile, selectFiles, setUpdatedFiles, updateAllFiles } from '@/app/store/files-reducer';
import { clearMergedFile, selectMergedFile, setMergedFile } from '@/app/store/merged-file-reducer';
import { mergeFilesAndRemoveCommonKeys, mergeFilesAndRemoveCommonKeysAllFiles } from '@/app/services/splinter-api';
import FileModalPreview from '../file/file-modal-preview';
import MergeIcon from '@mui/icons-material/Merge';
import { LANGUAGES, LanguageEnum } from '@/app/models/language.enum';
import { BRANDS, BrandEnum } from '@/app/models/brand.enum';
import { PROVINCES, ProvinceEnum } from '@/app/models/province.enum';

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

  const mergeFileByName = async (files: IJsonFile[] = [], nameQuery: string): Promise<IBackendResponse> => {
    const res = await mergeFilesAndRemoveCommonKeys(files.filter(file => file.name.includes(nameQuery)));
    console.log(nameQuery)
    console.log(res.data);
    return new Promise((resolve) => {
      resolve({
        mergedFile: res.data.mergedFile,
        files: res.data.files
      })
    })
  }
  // belair_en_CA_ab.json
/*
  const handleAllFilesMerge = async () => {
    console.log('handle files merge')
    try {
      const allFiles = filesState.files;
      const responseByLanguage: Map<LanguageEnum, IBackendResponse> = new Map();

      const responseByBrand: Map<BrandEnum, Map<LanguageEnum, IBackendResponse>> = new Map();

      LANGUAGES.forEach(async (lang) => {
        const response: IBackendResponse = await mergeFileByName(allFiles, lang);
        if (response.files.length > 0) {
          responseByLanguage.set(lang, response);
        }

        BRANDS.forEach(async (brand) => {
          LANGUAGES.forEach(async (lang) => {
            const responseBrandAndLanguage: Map<LanguageEnum, IBackendResponse> = new Map();
            const res = await mergeFileByName(allFiles, brand);
            if (res.files.length > 0) {
              responseBrandAndLanguage.set(lang, res);
            }
            responseByBrand.set(brand, responseBrandAndLanguage);
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  */
  const handleAllFilesMerge = async () => {
    try {
      const res = await mergeFilesAndRemoveCommonKeysAllFiles(filesState.files)
      console.log(res)
      //dispatch(setMergedFile(res.data.mergedFile))
      //dispatch(setUpdatedFiles(res.data.files))
    } catch (err) {
      console.log(err);
    }
  }

  const renderMergeButton = (): React.ReactNode => (
    <Button component="label" variant="contained" startIcon={<MergeIcon/>} fullWidth={true} onClick={() => {
      handleMergeFiles();
    }}>
      Merge files</Button>
  );

  const renderAllI18nFilesButton = (): React.ReactNode => (
    <Button component="label" variant="contained" startIcon={<MergeIcon />} fullWidth={true} onClick={() => {
      handleAllFilesMerge();
    }}>
      Create zip with separate files</Button>
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List sx={{ width: '100%', maxHeight: '20em', overflow: 'auto' }}>
            {filesState.files.map((file) => (
              <ListItem
                secondaryAction={
                   <>
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <FileModalPreview file={file}></FileModalPreview>
                        <IconButton edge="end" aria-label="delete" size="medium" color="default"
                          onClick={() => {
                            handleDelete(file.id);
                          }}>
                          <DeleteIcon />
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
      { filesState.files.length > 1 && renderMergeButton() }
      {filesState.files.length > 1 && renderAllI18nFilesButton()}
    </>
  )
}

export default FilesList;