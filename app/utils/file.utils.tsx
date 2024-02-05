import saveAs from 'file-saver';
import JSZip from 'jszip';
import { FILE_EXTENSION_JSON } from '../constants/file.constant';
import { BRANDS } from '../models/enum/brand.enum';
import { LANGUAGES } from '../models/enum/language.enum';
import { PROVINCES, ProvinceToBackendValue } from '../models/enum/province.enum';

export const exportData = (file: IJsonFile | null) => {
  if (file) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      stringifyJson(file.json)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = file.name;

    link.click();
  }
};

export const convertFileToBlob = (file: IJsonFile): Blob => {
  const str = stringifyJson(file);
  const bytes = new TextEncoder().encode(str);
  return new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });
};

export const stringifyJson = (file: IJsonFile | null): string => {
  return JSON.stringify(file, null, 4);
}

export const createZipFilesForAllBrands = async (allFilesResult: any) => {
  console.log('handle files merge')
  const zip = new JSZip();
  const downloadZipName = 'i18n';
  const zipFolder = zip.folder(downloadZipName);

  console.log(allFilesResult)
  LANGUAGES.forEach(async (lang) => {
    const file = allFilesResult[lang].json;
    if (file) {
      zipFolder?.file(`${lang}${FILE_EXTENSION_JSON}`, convertFileToBlob(file), { base64: true });
    }
  });
  BRANDS.forEach(async (brand) => {
    const brandFolder = zipFolder?.folder(brand.toLowerCase());
    const filesByBrand = allFilesResult.brands[brand.toUpperCase()];

    LANGUAGES.forEach(async (lang) => {
      if (filesByBrand && filesByBrand[lang]) {
        const file = filesByBrand[lang].json;
        if (file) {
          brandFolder?.file(`${lang}${FILE_EXTENSION_JSON}`, convertFileToBlob(file), { base64: true });
        }
      }
    });

    PROVINCES.forEach(async (province) => {
      const provinceBackendValue = ProvinceToBackendValue[province];
      const filesByProvince = filesByBrand?.provinces?.[provinceBackendValue];
      if (filesByProvince) {
        const provinceFolder = brandFolder?.folder(province);
        LANGUAGES.forEach(async (lang) => {
          const file = filesByProvince?.[lang]?.json;
          if (file) {
            provinceFolder?.file(`${lang}${FILE_EXTENSION_JSON}`, convertFileToBlob(file), { base64: true });
          }
        });
      }
    });
  });

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `${downloadZipName}.zip`);
  });
}