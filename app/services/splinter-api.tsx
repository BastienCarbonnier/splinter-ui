import axios from 'axios'

export const mergeFiles = async (data: IJsonFile[]): Promise<IJsonFile> => {
  return await axios.post('http://localhost:8080/file', { data }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}