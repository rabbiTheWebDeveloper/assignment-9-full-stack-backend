import { IContact} from "./contactus.interface";
import { Contact } from "./contactus.model";

export const getAllProductsFromDB = async (): Promise<IContact[]> => {
  return Contact.find();
};

export const getProductByIdFromDB = async (id: string): Promise<IContact[]> => {
  return Contact.find({ _id: id });
};



export const createContractFromDB = async ( data:IContact): Promise<IContact> => {
  const user = new Contact(data); //User -> class  user -> instance
  await user.save();
  return user;
  };