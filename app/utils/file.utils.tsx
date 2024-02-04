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