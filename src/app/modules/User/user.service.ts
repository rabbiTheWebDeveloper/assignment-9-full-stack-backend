import { IUser } from "./user.interface";
import { UsersModel } from "./user.model";
import UpdateWriteOpResult  from 'mongodb';

export const registrationFromDB = async (data: IUser): Promise<IUser> => {
  const user = new UsersModel(data); //User -> class  user -> instance
  await user.save();
  return user;
};

export const loginFromDB = async (reqBody: IUser): Promise<void> => {
  const user: any = await UsersModel.aggregate([
    { $match: reqBody },
    { $project: { _id: 1, email: 1, name: 1, mobile: 1, photo: 1 } },
  ]);
  return user;
};

export const userUpdateInDB = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<any | null> => {
  try {
    const result: any = await UsersModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );

    return result;
  } catch (error) {
    // Handle any errors that occur during the update process.
   
    throw error; // Rethrow the error or handle it as needed.
  }
};
