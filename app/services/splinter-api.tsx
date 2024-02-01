import axios from 'axios'

export const mergeFiles = async (data: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/file`, { data }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}

export const mergeFilesAndRemoveCommonKeys = async (data: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/files`, { data }, {
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