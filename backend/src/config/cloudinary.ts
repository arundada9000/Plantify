import { v2 as cloudinary } from 'cloudinary';
import { env } from '../../env';
import stream from 'stream';


cloudinary.config({
  cloud_name: env.cloudinary.cloud_name!,
  api_key: env.cloudinary.api_key!,
  api_secret: env.cloudinary.api_secret!,
});

export default cloudinary;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export const uploadToCloudinary = (buffer: Buffer, folder = 'uploads'): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    const readable = new stream.PassThrough();
    readable.end(buffer);
    readable.pipe(uploadStream);
  });
};
