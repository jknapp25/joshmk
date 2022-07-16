import { Storage } from "aws-amplify";

export default async function uploadImages(
  files,
  allowMultiple,
  fileSizeLimit,
  imageDisplayName
) {
  if (!files || files.length === 0) return [[], false];

  let showFileSizeError = false;

  let uploads = [];

  if (allowMultiple) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileSizeInMegabytes = (file.size / 1024 / 1024).toFixed(4);

      if (fileSizeInMegabytes > fileSizeLimit) {
        showFileSizeError = true;
      } else {
        uploads.push(Storage.put(file.name, file, { contentType: file.type }));
      }
    }
  } else {
    const file = files[0];
    const fileSizeInMegabytes = (file.size / 1024 / 1024).toFixed(4);

    if (fileSizeInMegabytes > fileSizeLimit) {
      showFileSizeError = true;
    } else {
      uploads.push(Storage.put(file.name, file, { contentType: file.type }));
    }
  }

  const resUploadKeyObjects = await Promise.all(uploads);

  if (resUploadKeyObjects && resUploadKeyObjects.length > 0) {
    const imageFileNames = resUploadKeyObjects.map((obj) => obj.key);
    return imageFileNames;
  }

  if (showFileSizeError) {
    const errorText = allowMultiple
      ? `One or more ${imageDisplayName}'s exceeds the size limit of ${fileSizeLimit}MB`
      : `${imageDisplayName} exceeds the size limit of ${fileSizeLimit}MB`;
    alert(errorText);
    return [[], false];
  }
}
