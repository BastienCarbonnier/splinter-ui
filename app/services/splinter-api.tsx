import axios from 'axios'

export const mergeFiles = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/file`, { files }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}

export const mergeFilesAndRemoveCommonKeys = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/files`, { files }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}

export const mergeFilesAndRemoveCommonKeysAllFiles = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/files/all-files`, { files }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}

export const validateFiles = async (files: IJsonFile[], referenceFile: IJsonFile): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/files/validation`, { files, referenceFile }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}