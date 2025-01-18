import cloudinary from "./cloudinary.js";

async function uploadImagesFunctionSingle(image) {
  // First cnvert the buffer to base64, then to dataURI
  const b64 = Buffer.from(image.buffer, "utf-8").toString("base64");
  const bufferImagesToB64 = `data:${image.mimetype};base64,${b64}`;

  // console.log(bufferImagesToB64);

  const imagesToUpload = async () => {
    const result = await cloudinary.uploader.upload(bufferImagesToB64, {
      resource_type: "auto",
    });
    return result.secure_url;
  };

  return await imagesToUpload;
}

export { uploadImagesFunctionSingle };
