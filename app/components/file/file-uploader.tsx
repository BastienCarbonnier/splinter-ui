"use client";
import Button from '@mui/material/Button';
import { mergeFiles } from '@/app/services/splinter-api';
import FileListDisplay from './file-list-display';
import FileInput from './file-input';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectFiles } from '@/app/store/files-reducer';
import { add, selectFile } from '@/app/store/merged-file-reducer';
import FileDisplayJson from './file-display-json';

export default function FileUploader() {
  const filesState = useAppSelector(selectFiles);
  const mergedFileState = useAppSelector(selectFile);
  const dispatch = useAppDispatch();

  const handleMergeFiles = async () => {
    try {
      const res = await mergeFiles(filesState.files)
      dispatch(add(res.data))

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
      <FileInput></FileInput>
      <FileListDisplay files={filesState.files}></FileListDisplay>
      { filesState.files.length > 1 && renderMergeButton() }

      {mergedFileState.mergedFile && <FileDisplayJson file={mergedFileState.mergedFile}></FileDisplayJson> }
    </>
  )
}
