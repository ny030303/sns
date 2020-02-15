import axios from "axios";
import {trackPromise} from 'react-promise-tracker';
import waitDialog from "./WaitDialog/WaitDialog";

const config = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};

let storyUserInfos = {};

export const getStoryUserData = (userid) => storyUserInfos[userid];

export const setStoryUserData = (userid, name, img) => {
  // console.log(userid, name, img);
  if(storyUserInfos[userid]) {
    storyUserInfos[userid].name = name || storyUserInfos[userid].name;
    storyUserInfos[userid].img = img || storyUserInfos[userid].img;
  }
  else {
    storyUserInfos[userid] = {name: name, img: img};
  }
};

export const getLoginInfo = () => {
  let data = localStorage.getItem('loginUser');
  return (data) ? JSON.parse(data) : null;
};

export const deleteUser = (uid, callback) => {
  axios.get(`/php/deleteUser.php?id=${uid}`, config).then(res => {
    // console.log('deleteUser:', res.data.result);
  });
};

export const getUser = (uid, pwd, callback) => {
  fetch(`/php/login.php?id=${uid}&pwd=${pwd}`).then(data => data.json()).then(res => {
    // console.log('getUser:', res);
    if (res.result) {
      // localStorage.setItem('userInfo', JSON.stringify(res.user));
    }
    if (callback) callback(res);
  });
};

export const getUserInfo = (uid, callback) => {
  trackPromise(
    axios.get(`/php/getUser.php?userid=${uid}`, config).then(res => {
      const {name, profileimg} = res.data;
      setStoryUserData(uid, name, profileimg);
      if (callback) callback(res.data);
    })
  );
};


export const putUser = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/signup.php`, formData).then(res => {
    // console.log('putUser:', res.data);
    if (callback) callback(res.data);
  });
};

export const logout = (callback) => {
  // localStorage.removeItem('loginUser');
  axios.get(`/php/logout.php`, config).then(res => {
    // console.log('logout:', res.data.result);
    if (callback) callback(res.data.result);
  });
};


// request (1) => 친구 신청 온 것
// request (0) => 추천 친구 목록에서 지운 친구
// request (100) => 친구

export const addFriend = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/addFriend.php`, formData).then(res => {
    // console.log('addFriend:', res.data);
    if (callback) callback(res.data);
  });
};


export const deleteFriend = (uid, friend, request, callback) => {
  axios.get(`/php/deleteFriend.php?userid=${uid}&friend=${friend}&request=${request}`).then(res => {
    // console.log('deleteFriend:', res.data);
    if (callback) callback(res.data);
  });
};


export const getFriends = (uid, request, callback) => {
  axios.get(`/php/getFriends.php?userid=${uid}&request=${request}`, config).then(res => {
    // console.log('getFriends:', res.data);
    if (callback) callback(res.data);
  });
};

export const getApplyFriends = (uid, request, callback) => {
  axios.get(`/php/getAcceptFriends.php?userid=${uid}&request=${request}`, config).then(res => {
    // console.log('getApplyFriends:', res.data);
    if (callback) callback(res.data);
  });
};

export const getRecommendFriend = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/getRecommendFriends.php`, formData).then(res => {
    // console.log('getRecommendFriends:', res.data);
    if (callback) callback(res.data);
  });
};


export const addApplyFriend = (uid, friend, callback) => {
  axios.get(`/php/applyFriend.php?userid=${uid}&friend=${friend}`).then(res => {
    // console.log('applyFriend:', res.data);
    if (callback) callback(res.data);
  });
};

export const excludeRecommendFriend = (uid, friend, callback) => {
  axios.get(`/php/excludeRecommendFriend.php?userid=${uid}&friend=${friend}`).then(res => {
    // console.log('excludeRecommendFriend:', res.data);
    if (callback) callback(res.data);
  });
};

export const getUserFriends = (uid,callback) => {
  axios.get(`/php/getUserFriends.php?userid=${uid}`).then(res => {
    if (callback) callback(res.data);
  });
};

export const deleteUserFriend = (uid,friend, callback) => {
  axios.get(`/php/deleteUserFriend.php?userid=${uid}&friend=${friend}`).then(res => {
    if (callback) callback(res.data);
  });
};


//---------Story----------

export const postWriting = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  waitDialog.show();
  axios.post(`/php/postWriting.php`, formData).then(res => {
    // console.log('postWriting:', res.data);
    if (callback) callback(res.data);
    waitDialog.hide();
  });
};

export const getPost = (uid, callback) => {
  trackPromise(
    axios.get(`/php/getPost.php?userid=${uid}`).then(res => {
      // console.log('getPost: ', res.data);
      if (callback) callback(res.data);
    })
  );
};

export const getPostFeeling = (pid, callback) => {
  trackPromise(
    axios.get(`/php/getPostFeeling.php?postid=${pid}`).then(res => {
      // console.log('getPost: ', res.data);
      if (callback) callback(res.data);
    })
  );
};

export const updatePostFeeling = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/addPostFeeling.php`, formData).then(res => {
    // console.log('updatePostFeeling: ', res.data);
    if (callback) callback(res.data);
  });
};

export const deletePostFeeling = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/deletePostFeeling.php`, formData).then(res => {
    // console.log('deletePostFeeling: ', res.data);
    if (callback) callback(res.data);
  });
};

export const updateStoryIsPrivateNum = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateStoryIsPrivateNum.php`, formData).then(res => {
    // console.log('updateStoryIsPrivateNum:', res.data);
    if (callback) callback(res.data);
  });
};

export const deletePost = (postid, callback) => {
  waitDialog.show();
  axios.get(`/php/deletePost.php?postid=${postid}`).then(res => {
    console.log('deletePost: ', res.data);
    if (callback) callback(res.data);
    waitDialog.hide();
  });
};

export const updatePost = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateWriting.php`, formData).then(res => {
    // console.log('updateWriting:', res.data);
    if (callback) callback(res.data);
  });
};

export const getUserPosts = (userid, callback) => {
  trackPromise(
    axios.get(`/php/getUserPosts.php?userid=${userid}`).then(res => {
      // console.log('getUserPosts: ', res.data);
      if (callback) callback(res.data);
    })
  );
};


export const addPostUp = (postid, userid, callback) => {
  axios.get(`/php/addPostUp.php?postid=${postid}&userid=${userid}`).then(res => {
    // console.log('deletePost: ', res.data);
    if (callback) callback(res.data);
  });
};

export const deletePostUp = (postid, userid, callback) => {
  axios.get(`/php/deletePostUp.php?postid=${postid}&userid=${userid}`).then(res => {
    // console.log('deletePost: ', res.data);
    if (callback) callback(res.data);
  });
};

//-----------Comment-----------

export const addComment = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/addComment.php`, formData).then(res => {
    // console.log('addComment:', res.data);
    if (callback) callback(res.data);
  });
};

export const updateComment = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateComment.php`, formData).then(res => {
    // console.log('updateComment:', res.data);
    if (callback) callback(res.data);
  });
};

export const deleteComment = (commentid, callback) => {
  axios.get(`/php/deleteComment.php?commentid=${commentid}`).then(res => {
    // console.log('getPost: ', res.data);
    if (callback) callback(res.data);
  });
};

export const getComments = (postid, callback) => {
  Promise.all([
    axios.get(`/php/getComments.php?postid=${postid}`),
    axios.get(`/php/getCommentUsers.php?postid=${postid}`)]
  ).then(arrRes => {
    arrRes[1].data.users.forEach(v => setStoryUserData(v.id, v.name, v.profileimg));
    // console.log('getPost: ', arrRes[0].data);
    if (callback) callback(arrRes[0].data);
  });
};


export const getCommentHeart = (commentid, callback) => {
  axios.get(`/php/getCommentHeart.php?commentid=${commentid}`).then(res => {
    // console.log('getPost: ', res.data);
    if (callback) callback(res.data);
  });
};

export const addCommentHeart = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/addCommentHeart.php`, formData).then(res => {
    // console.log('addCommentHeart:', res.data);
    if (callback) callback(res.data);
  });
};

export const deleteCommentHeart = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/deleteCommentHeart.php`, formData).then(res => {
    // console.log('deleteCommentHeart:', res.data);
    if (callback) callback(res.data);
  });
};


//---------userInfo-----------

export const updateUserProfileImg = (data, callback) => {
  const formData = new FormData();
  setStoryUserData(data.userid, null, data.img);
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateUserProfileImg.php`, formData).then(res => {
    // console.log('updateUserProfileImg:', res.data);
    if (callback) callback(res.data);
  });
};

export const updateUserBgImg = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateUserBgImg.php`, formData).then(res => {
    // console.log('updateUserBgImg:', res.data);
    if (callback) callback(res.data);
  });
};

export const updateUserProfileInfo = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/updateUserProfileInfo.php`, formData).then(res => {
    // console.log('updateUserProfileInfo:', res.data);
    if (callback) callback(res.data);
  });
};
//---------search-----------

export const getSearchBoxItemInfos = (data, callback) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  axios.post(`/php/getSearchBoxItemInfos.php`, formData).then(res => {
    // console.log('updateUserProfileInfo:', res.data);
    if (callback) callback(res.data);
  });
};


export const getSnsFileData = (fileid, callback) => {
  axios.get(`/php/getFileData.php?fileid=${fileid}`).then(res => {
    if (callback) callback(res.data);
  });
};
