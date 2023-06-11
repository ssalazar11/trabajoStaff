import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dqeykfebu",
  api_key: "268342349577133",
  api_secret: "xClhnQrZX9YmtBXOl6lqNjMmd2c",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  console.log(id);
  return await cloudinary.uploader.destroy(id);
};
