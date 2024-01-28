import axios from 'axios'

export const mergeFiles = async (data: IJsonFile[]): Promise<any> => {
  console.log(process.env.NEXT_PUBLIC_SPLINTER_API_URL);
  return await axios.post(`${process.env.NEXT_PUBLIC_SPLINTER_API_URL}/file`, { data }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  });
}