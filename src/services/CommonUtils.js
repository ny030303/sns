import axios from "axios";
import waitDialog from "./WaitDialog/WaitDialog";

const multipartFromDataConfig = { headers: { 'content-type': 'multipart/form-data'}};
export const fileToServerURL = async(inputfile) => {
  if (inputfile === undefined) return null;
  const formData = new FormData();
  formData.append('extension', inputfile.type.split('/')[1]);
  formData.append('upload', inputfile, 'movieFile');
  waitDialog.show();
  let url;
  try {
    let res = await axios.post(`/php/uploadMovieFile.php`, formData, multipartFromDataConfig);
    // console.log(url);
    url = res.data.url;
  }
  catch(e) {
    // console.log(e);
  }
  waitDialog.hide();
  return url;
};

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