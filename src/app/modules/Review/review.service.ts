import { IReview } from "./review.interface";
import { Review } from "./review.model";

export const getAllReviewFromDB = async (): Promise<IReview[]> => {
  return Review.find();
};

export const getReviewByIdFromDB = async (id: string): Promise<IReview[]> => {
  return Review.find({ _id: id });
};

export const createReviewFromDB = async (data: any): Promise<IReview> => {
  // const user = new Product(data); //User -> class  user -> instance
  await data.save();
  return data;
};

export const updateReviewFromDB = async (id: any, data: any): Promise<any> => {
  try {
    const result = await Review.updateOne({ _id: id }, { $set: data }, { new: true });
    if (result.modifiedCount === 0) {
      throw new Error("Review not found or not modified");
    }
    const updatedDocument = await Review.findById(id);
    if (!updatedDocument) {
      throw new Error("Review not found");
    }
    return updatedDocument;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
