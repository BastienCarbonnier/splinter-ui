"use client";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { mergeFiles } from '@/app/services/splinter-api';

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
  const [jsonsFile, setJsonsFile] = useState<IJsonFile[]>([]);
  const [numberOfFile, setNumberOfFile] = useState<number>(0);

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    const fileReader = new FileReader();
    const { files } = target;

    fileReader.onload = function (event) {
      const jsonText = fileReader.result;
      
      if (jsonText) {
        const jsonFile: IJsonFile = {
          name: files[0].name,
          json: JSON.parse(jsonText.toString())
        };
        setJsonsFile([...jsonsFile, jsonFile]);
        setNumberOfFile(numberOfFile + 1);
      }
    };


    fileReader.readAsText(files[0], "UTF-8");
  }

  const handleMergeFiles = async () => {
    try {
      const res = await mergeFiles(jsonsFile)
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  

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
      <div>
        <ul>
          { 
          jsonsFile.map((json) => (
            <li key={json.name}>
              {json.name}
            </li>
          ))
          }
        </ul>
      </div>
      <Button component="label" variant="contained" onClick={() => {
        handleMergeFiles();
      }}>
        Merge files
      </Button>
    </>
  )
}
