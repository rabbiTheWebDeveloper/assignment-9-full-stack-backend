import { ISettings } from "./settings.interface";
import { Setting } from "./settings.model";

;

export const getSettingDB = async (): Promise<ISettings[]> => {
  return Setting.find();
};


export const createSettingFromDB = async ( data:any): Promise<ISettings> => {
    await data.save();
    return data;
  };