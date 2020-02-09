export const fileToDataURL = async (inputfile) => {
  if (inputfile === undefined) return null;
  //console.log(inputfile.files[0]);
  let fileData = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(reader.result);
    reader.readAsDataURL(inputfile);
  });
  return fileData;
};