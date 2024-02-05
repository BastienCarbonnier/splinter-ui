interface IJsonFile {
  id: string;
  name: string;
  json: any;
}

interface IBackendResponse {
  mergedFile: IJsonFile;
  files: IJsonFile[];
}
