import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";
import { DeleteResult } from "mongodb";

export const getAllBannerFromDB = async (): Promise<IBanner[]> => {
  return Banner.find().sort({createdAt: -1,});
};

export const getBannerByIdFromDB = async (id: string): Promise<IBanner[]> => {
  return Banner.find({ _id: id });
};



export const createBannerFromDB = async ( data:any): Promise<IBanner> => {

    // const user = new Product(data); //User -> class  user -> instance
    await data.save();
    return data;
  };

  export const bannerdelete = async ( id: string): Promise<DeleteResult> => {
    // const user = new Product(data); //User -> class  user -> instance
    return Banner.deleteOne({ _id: id });
  };


  export const updateBannerFromDB = async (id: any, data: any): Promise<any> => {
    try {
      const result = await Banner.updateOne({ _id: id }, { $set: data }, { new: true });
      if (result.modifiedCount === 0) {
        throw new Error("Banner not found or not modified");
      }
      const updatedDocument = await Banner.findById(id);
      if (!updatedDocument) {
        throw new Error("Banner not found");
      }
      return updatedDocument;
    } catch (error) {
      console.error("Error updating Banner:", error);
      throw error;
    }
  };