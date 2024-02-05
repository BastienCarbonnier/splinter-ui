import axios from 'axios'

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const baseUrl = `${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/files`

export const mergeFiles = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/file`, { files }, { headers });
}

export const mergeFilesAndRemoveCommonKeys = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(baseUrl, { files }, { headers });
}

export const mergeFilesAndRemoveCommonKeysAllBrandFiles = async (files: IJsonFile[]): Promise<any> => {
  return await axios.post(`${baseUrl}/all-brand-files`, { files }, { headers });
}

export const validateFiles = async (files: IJsonFile[], referenceFile: IJsonFile): Promise<any> => {
  return await axios.post(`${baseUrl}/validation`, { files, referenceFile }, { headers });
}