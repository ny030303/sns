import axios from "axios";

const config = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};

export const DBItemDataToItems = (item) => {
    let colorPicks = [];
    item.colors.split(',').forEach(v => colorPicks.push({title: 'NONE', color: `#${v}`}));
    return {
        pid: item.id,
        image: item.img1,
        hoverImage: item.img2,
        title: item.title,
        salePrice: Number(item.price),
        firstPrice: Number(item.oldprice),
        heartCnt: Number(item.ulike),
        colorPick: colorPicks
    };
};

export const getLoginInfo = () => {
    let data = localStorage.getItem('loginUser');
    return (data) ? JSON.parse(data) : null;
};

export const deleteUser = (uid, callback) => {
    axios.get(`/php/deleteUser.php?id=${uid}`, config).then(res => {
        console.log('deleteUser:', res.data.result);
    });
};

export const logout = (callback) => {
    localStorage.removeItem('loginUser');
    axios.get(`/php/logout.php`, config).then(res => {
        console.log('logout:', res.data.result);
        if (callback) callback(res.data.result);
    });
};

export const setHeartUser = (data, callback) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    axios.post(`/php/setHeartUser.php`, formData).then(res => {
        console.log('setHeartUser:', res.data);
        if (callback) callback(res.data);
    });
};

export const postWriting = (data, callback) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    axios.post(`/php/postWriting.php`, formData).then(res => {
        console.log('postWriting:', res.data);
        if (callback) callback(res.data);
    });
};

// export const getUser = (uid, pwd, callback) => {
//     axios.get(`/php/login.php?id=${uid}&pwd=${pwd}`, config).then(res => {
//         console.log('getUser:', res.data);
//         if( res.data.result ) {
//             localStorage.setItem('loginUser', JSON.stringify(res.data.user));
//         }
//         if (callback) callback(res.data);
//     });
// };

export const getUser = (uid, pwd, callback) => {
    fetch(`/php/login.php?id=${uid}&pwd=${pwd}`).then(data => data.json()).then(res => {
        console.log('getUser:', res);
        if( res.result ) {
            localStorage.setItem('loginUser', JSON.stringify(res.user));
        }
        if (callback) callback(res);
    });
};


export const putUser = (data, callback) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    axios.post(`/php/signup.php`, formData).then(res => {
        console.log('putUser:', res.data);
        if (callback) callback(res.data);
    });
};


// export const putUser = (data, callback) => {
//     // const formData = new FormData();
//     // Object.keys(data).forEach(key => formData.append(key, data[key]));
//     // axios.post(`/php/signup.php`, formData).then(res => {
//     //     console.log('putUsers:', res.data);
//     //     if (callback) callback(res.data);
//     // });
//
//     fetch('/php/signup.php', {
//         method: 'POST',
//         body: JSON.stringify(data)
//     }).then(data => data.json()).then(res => {
//         console.log('putUsers:', res);
//         if(callback) callback(res);
//     });
// };
