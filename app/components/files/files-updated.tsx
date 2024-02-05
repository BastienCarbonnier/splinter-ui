import { Divider, Stack, Typography } from '@mui/material';
import FilesList from './files-list';
import FilesDownloaderButton from './files-downloader-button';
import FileDownloaderButton from '../file/file-downloader-button';
import { FILE_EXTENSION_JSON } from '@/app/constants/file.constant';

interface Props {
  files: IJsonFile[]
  mergedFile: IJsonFile
}

function FilesUpdated({ files, mergedFile }: Props): JSX.Element {
  return (
      <>
        <Typography variant="h4" marginBottom='1.5em'>
          Updated files
        </Typography>

        <Stack
          width='100%'
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
        >
          <FilesDownloaderButton files={files} mergedFile={mergedFile} title='Export all' zipName='updated_files'></FilesDownloaderButton>
          <FileDownloaderButton file={mergedFile} title='Export merged file' fileName={`common_keys_and_values${FILE_EXTENSION_JSON}`}></FileDownloaderButton>
        </Stack>
        <FilesList files={files} deletePossible={false}></FilesList>
      </>
  )
}

export default FilesUpdated;