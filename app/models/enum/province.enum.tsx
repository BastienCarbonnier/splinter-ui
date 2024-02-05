export enum ProvinceEnum {
  NEW_BRUNSWICK = "nb",
  NEW_SCOTLAND= "ns",
  NEW_FOUNDLAND = "nl",
  PRINCE_EDWARDS = "pe",
  QUEBEC = "qc",
  ALBERTA = "ab",
  ONTARIO = "on",
  BRITISH_COLUMBIA = "bc"
}

export const PROVINCES: ProvinceEnum[] = [
  ProvinceEnum.ALBERTA, 
  ProvinceEnum.BRITISH_COLUMBIA, 
  ProvinceEnum.NEW_BRUNSWICK, 
  ProvinceEnum.NEW_FOUNDLAND, 
  ProvinceEnum.NEW_SCOTLAND, 
  ProvinceEnum.ONTARIO, 
  ProvinceEnum.PRINCE_EDWARDS, 
  ProvinceEnum.QUEBEC
];

export const ProvinceToBackendValue: Record<ProvinceEnum, string> = {
  [ProvinceEnum.ALBERTA]: "ALBERTA",
  [ProvinceEnum.BRITISH_COLUMBIA]: "BRITISH_COLUMBIA",
  [ProvinceEnum.NEW_BRUNSWICK]: "NEW_BRUNSWICK",
  [ProvinceEnum.NEW_FOUNDLAND]: "NEW_FOUNDLAND",
  [ProvinceEnum.NEW_SCOTLAND]: "NEW_SCOTLAND",
  [ProvinceEnum.ONTARIO]: "ONTARIO",
  [ProvinceEnum.PRINCE_EDWARDS]: "PRINCE_EDWARDS",
  [ProvinceEnum.QUEBEC]: "QUEBEC"
}