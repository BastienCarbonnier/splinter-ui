import axios from 'axios'

export const mergeFiles = async (data: IJsonFile[]): Promise<any> => {
  return await axios.post(`${process.env.SPLINTER_API_URL}/file`, { data }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}