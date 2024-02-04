export const exportData = (file: IJsonFile | null) => {
  if (file) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(file?.json, null, 4)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = file.name;

    link.click();
  }
};

export const convertFileToBlob = (file: IJsonFile): Blob => {
  const str = JSON.stringify(file, null, 4);
  const bytes = new TextEncoder().encode(str);
  return new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });
};