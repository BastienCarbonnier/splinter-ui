"use client";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function FileUploader() {
  const [jsonsFile, setJsonsFile] = useState<any[]>([]);
  const [numberOfFile, setNumberOfFile] = useState<number>(0);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    const fileReader = new FileReader();
    const { files } = target;

    fileReader.onload = function (event) {
      const jsonText = fileReader.result;
      console.log(jsonText);
      if (jsonText) setJsonsFile([...jsonsFile, JSON.parse(jsonText.toString())]);
      setNumberOfFile(numberOfFile + 1);
      console.log(jsonsFile);
    };
    fileReader.readAsText(files[0], "UTF-8");
  }
  
  return (
    <>
      <div>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" id="jsonFile" name="jsonFile" onChange={handleOnChange} accept="application/json" />
        </Button>
      </div>
      <div>
        <pre>{numberOfFile !== 0 ? `${numberOfFile} fichier uploadé` : 'Aucun fichier uploadé'}</pre>
      </div>
    </>
  )
}
