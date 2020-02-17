import React from 'react';
import LazyLoad from 'react-lazyload';
import './UserStory.css';
import "../../services/WaitDialog/WaitDialog.css";

import {
  getUserInfo,  updateUserProfileImg,  updateUserBgImg,  getUserPosts,
  getUserFriends, setStoryUserData, getComments, deletePost, deleteUserFriend
} from "../../services/DataService";
import eventService from "../../services/EventService";
import alertDialog from "../../services/AlertDialog";
import waitDialog from "../../services/WaitDialog/WaitDialog";
import {fileToDataURL} from "../../services/CommonUtils";

import {MyMenu} from "../../Component/MyMenu/MyMenu";
import StoryItem, {StoryItemLoading} from "../../Component/StoryItem/StoryItem";
import {ProfileSettingItem} from "../../Component/ProfileSettingItem/ProfileSettingItem";
import {UserStoryCalendar} from "../../Component/UserStoryCalendar/UserStoryCalendar";
import {UserStoryImages} from "../../Component/UserStoryImages/UserStoryImages";


class UserStory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenuIdx: 0,
      posterInfo: null,
      isBgMenuFade: false,
      postList: [],
      sideMemoFixed: false,

      loading: false,
      loginUserFriendsList: [],
      isFriend: false,

      infoType: this.props.match.params.type
    };
    // console.log(props.match.params.userId);
    this.menus = ["main", "calendar", "images", "videos"];
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.loadUserInfo();
    // this.getPostEvent();
    this.reloadLoginUserFriends();
    document.addEventListener("scroll", e => {
      // console.log(e);
      if (window.scrollY >= 364) {
        this.setState({sideMemoFixed: true});
      }
      else {
        this.setState({sideMemoFixed: false});
      }
    })
  }

  componentDidMount() {
    this.loadUserInfo();
    this.getPostEvent();

    let idx = this.menus.findIndex(v => v === this.props.match.params.type);
    this.setState({selectedMenuIdx: idx});

    eventService.listenEvent("updatePostToMainAndUserStory", (postData) => {
      let posts = this.state.postList;
      let idx = posts.findIndex(v => v.id === postData.id);
      console.log(posts, postData.id);
      console.log(postData, posts[idx]);
      posts[idx] = postData;
      this.setState({postList: posts});
    });

    eventService.listenEvent("updateIsPrivateNumToMainAndUserStory", (isPrivateNumData) => {
      let posts = this.state.postList;
      let idx = posts.findIndex(v => v.id === isPrivateNumData.postid);
      console.log(isPrivateNumData, posts[idx]);
      if (posts[idx].isprivate_num) posts[idx].isprivate_num = isPrivateNumData.isprivate_num;
      // posts[idx] = postData;
      this.setState({postList: posts});
    });

    eventService.listenEvent("feelingUpdateToMainAndUserStory", (data) => {
      console.log(data);
      let posts = this.state.postList;
      [posts.find(v => v.id === data.postid)].forEach(v => {
        if(v.feeling) {
          v.feeling = data.feeling;
          this.setState({postList: posts});
        }
      });
    });

    eventService.listenEvent("reloadStorys", (res) => {
      console.log(res);
      this.getPostEvent();
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props.match.params, prevProps.match.params);
    // console.log(prevProps.match.params.type, this.props.match.params);
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.loadUserInfo();
      this.getPostEvent();
      this.reloadLoginUserFriends();
    }
    if (this.props.match.params.type !== prevProps.match.params.type) {
      let idx = this.menus.findIndex(v => v === this.props.match.params.type);
      this.setState({infoType: this.props.match.params.type, selectedMenuIdx: idx});
    }
  }

  reloadLoginUserFriends = () => {
    getUserFriends(this.nowUserInfo.id, (data) => {
      this.setState({isFriend: false});
      data.friends.forEach((v, i) => {
        if (this.props.match.params.userId === v.friend) {
          this.setState({isFriend: true});
        }
      });
    });
  };

  loadUserInfo = () => {
    getUserInfo(this.props.match.params.userId, (udata) => {
      this.getPostEvent();
      // 바꿔야 함... 여긴 항상 로그인 유저만 오는 것이 아님. <= (바꿈)
      if (this.nowUserInfo.id === this.props.match.params.userId) {
        localStorage.setItem("userInfo", JSON.stringify(udata.data));
        eventService.emitEvent("changeUserProfile");
      }
    });
  };

  getPostEvent = () => {
    getUserPosts(this.props.match.params.userId, (data) => {
      // console.log(data);
      if (data.posts !== undefined) {
        let arr = data.posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        if (this.nowUserInfo.id !== this.props.match.params.userId) {
          arr = arr.filter(v => Number(v.isprivate_num) !== 1);
        }
        this.setState({postList: arr, posterInfo: data.user});
        setStoryUserData(data.user.userid, data.user.name, data.user.profileimg);

        let posts = this.state.postList;
        // console.log(posts);
        posts.forEach(v => {
          v.onUpdateComments = (comments) => {
            console.log(v.id, comments);
            [this.state.postList.find(fv => fv.id === v.id)].forEach(postData => {
              postData.comments = comments;
              this.setState({postList: this.state.postList});
            });
          };
        });
        this.setState({postList: posts});
      }
    });
  };

  updatePostEvent = (e) => {
    let postid = e.target.dataset.num;
    let editPost = this.state.postList.find(v => v.id === postid);
    eventService.emitEvent("editPostToMyHeader", editPost);
  };

  deletePostEvent = (e) => {
    let postid = e.target.dataset.num;
    console.log('postid:', postid, this.state.postList);
    deletePost(postid, (res) => {
      if (res.result == 1) {
        // this.getPostEvent();
        this.setState({postList: this.state.postList.filter(v => postid !== v.id)})
      }
      console.log('result:', res.result, this.state.postList);
    });
  };


  storyLinkEvent = (e) => {
    this.setState({selectedMenuIdx: Number(e.target.dataset.midx)});
    switch (Number(e.target.dataset.midx)) {
      case 0:
        this.props.history.push(`/story/${this.props.match.params.userId}/main`);
        break;
      case 1:
        this.props.history.push(`/story/${this.props.match.params.userId}/calendar`);
        break;
      case 2:
        this.props.history.push(`/story/${this.props.match.params.userId}/images`);
        break;
      case 3:
        this.props.history.push(`/story/${this.props.match.params.userId}/videos`);
        break;
    }
  };

  // ================ 메뉴 function ================

  showBgMenu = () => this.setState({isBgMenuFade: !this.state.isBgMenuFade});

  changeUserProfileImg = (e) => {
    this.showBgMenu();
    fileToDataURL(e.target.files[0]).then(res => {
      let canvas = document.createElement("canvas");
      canvas.setAttribute("width", 128);
      canvas.setAttribute("height", 128);
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.onload = () => {
        let rtSrc = {x: 0, y: 0, w: img.width, h: img.height};
        if( img.width > img.height ) {
          rtSrc.w = img.height;
          rtSrc.x = (img.width - rtSrc.w) / 2;
        }
        else {
          rtSrc.h = img.width;
          rtSrc.y = (img.height - rtSrc.h) / 2;
        }
        console.log(rtSrc);
        ctx.drawImage(img, rtSrc.x,rtSrc.y, rtSrc.w, rtSrc.h, 0, 0, 128, 128);
        updateUserProfileImg({userid: JSON.parse(localStorage.getItem("userInfo")).id, img: canvas.toDataURL()}, () => {
          this.loadUserInfo();
        });
      };
      img.src = res;
    });
  };

  changeUserBgImg = () => {
    this.showBgMenu();
    // console.log("changeUserBgImg");
    let randomNum = Math.floor(Math.random() * (25 - 10) + 10);
    updateUserBgImg({
      userid: JSON.parse(localStorage.getItem("userInfo")).id,
      img: `/images/userBackground/bg${randomNum}.jpg`
    }, () => {
      this.loadUserInfo();
    });
  };

  selectRandomBgImg = (e) => {
    this.showBgMenu();
    // console.log("selectRandomBgImg: ", e);
    console.log(e.target.files);
    fileToDataURL(e.target.files[0]).then(res => {
      updateUserBgImg({userid: JSON.parse(localStorage.getItem("userInfo")).id, img: res}, () => {
        this.loadUserInfo();
      });
    });
  };

  onUnfriendingEvent = () => {
    this.showBgMenu();
    waitDialog.show();
    deleteUserFriend(this.nowUserInfo.id, this.props.match.params.userId, (res) => {
      console.log(res);
      waitDialog.hide();
      if (res.result1 === 1 && res.result2 === 1) {
        alertDialog.show("안내", "친구를 끊었습니다.");
        this.setState({isFriend: false});
        this.getPostEvent();
        eventService.emitEvent("reloadFriendListToRightHeader");
      }
      else {
        alertDialog.show("오류!", "친구 끊기를 실패했습니다.");
      }
    });
  };


  render() {
    if (this.state.posterInfo == null) return (<div/>);
    // console.log(this.state.posterInfo);
    const menus = ["전체", "캘린더", "사진", "동영상", "장소", "뮤직", "더보기+6"];
    const menuClass = (i) => `story_link ${i === this.state.selectedMenuIdx ? "story_link_on" : ""}`;
    const {posterInfo, sideMemoFixed, infoType, isFriend} = this.state;
    // console.log(postList);
    const userData = [{userid: posterInfo.id, name: posterInfo.name, profileimg: posterInfo.profileimg}];
    let postList = this.state.postList;
    if (!(this.nowUserInfo.id === this.props.match.params.userId || isFriend)) {
      postList = postList.filter(v => Number(v.isprivate_num) !== 2);
    }

    return (
        <div className="userStory">
          <div className="article_story">
            <div className="story_cover"
                 style={{backgroundImage: `url(${(posterInfo.backimg == null) ? `/images/userBackground/bg10.jpg` : posterInfo.backimg})`}}>
              <div className="story_cover_img"/>
              <div className="bg_cover"/>
              <div className="cover_cont">
                <div className="info_pf">
                  {
                    (posterInfo.profileimg) ? (<div className="link_pf userProfileImg"
                                                    style={{backgroundImage: `url(${posterInfo.profileimg})`}}/>) : (
                        <div className="link_pf bg_pf"/>)

                  }
                  {
                    (this.nowUserInfo.id === this.props.match.params.userId) ?
                        (<div className="filebox">
                          <label htmlFor="story_img_file" className="ico_ks ico_pf"/>
                          <input type="file" id="story_img_file" onChange={this.changeUserProfileImg}/>
                        </div>) : null
                  }

                  <div className="userStoryName">{posterInfo.name}</div>
                  <p className="userStoryMemo">{posterInfo.memo}</p>
                </div>
                <div className="menu_story">
                  <ul className="story_list">
                    {
                      menus.map((menu, i) => (
                          <li key={i} onClick={this.storyLinkEvent} data-midx={i}
                              className={menuClass(i)}>
                            {menu}
                          </li>
                      ))
                    }
                  </ul>
                  <div className="info_btn">
                    {
                      (this.nowUserInfo.id === this.props.match.params.userId) ?
                          (<div className="btn_cover" onClick={this.showBgMenu}>배경 사진 편집</div>) :
                          (isFriend) ? (<>
                                <div className="btn_friend_cover" onClick={this.showBgMenu}>친구</div>
                                <div className="area_ico">
                                  <span className="ico_ks ico_open"/>
                                </div>
                              </>) :
                              (<div className="btn_cover">친구신청</div>)
                    }

                    {
                      (this.state.isBgMenuFade) ?
                          (this.nowUserInfo.id === this.props.match.params.userId) ?
                              (<MyMenu menuInfo={[{text: "사진 업로드", type: "file", eventCallback: this.selectRandomBgImg},
                                {text: "기본 이미지", type: "normal", eventCallback: (e) => this.changeUserBgImg(e)}]}
                                       menuStyle={{marginTop: "35px"}}/>)
                              : (isFriend) ?
                              (<MyMenu menuInfo={[{text: "친구 끊기", type: "normal", eventCallback: this.onUnfriendingEvent},
                                {text: "차단하기", type: "normal"}]}
                                       menuStyle={{marginTop: "35px"}}/>) : null
                          : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="story_cont">
              <div className="story_post_wrap">

                {
                  (() => {
                    switch (infoType) {
                      case "profileSetting":
                        return (<ProfileSettingItem loadUserInfo={this.loadUserInfo}/>);
                      case "calendar":
                        return (<UserStoryCalendar/>);
                      case "images":
                        return (<UserStoryImages postData={postList}/>);
                    }
                    // "main" and default
                    return postList.map((v, i) => (
                        <LazyLoad key={i} placeholder={<StoryItemLoading/>}>
                          <StoryItem key={i} postData={v} arrnum={i} userData={userData}
                                     updatePostEvent={this.updatePostEvent} deletePostEvent={this.deletePostEvent}/>
                        </LazyLoad>
                    ));
                  })()
                }

              </div>
              <div className="story_widgets">
                <div className="testStyle" style={(sideMemoFixed) ? {position: "fixed", top: "79px"} : null}>
                  <div className="section_widgets">
                    <h3 className="tit_widgets">정보 <span className="ico_ks ico_more">채널정보 더보기</span></h3>
                    <div className="list_info">
                      <div className="subtit_info">
                        <span className="ico_ks ico_birthday"/>
                        <span className="tit_info">생일</span>
                        <div className="desc_info">{posterInfo.birth}</div>
                      </div>
                      <div className="subtit_info tit_story">
                        <span className="ico_ks ico_story"/>
                        <span className="tit_info">스토리</span>
                        <div className="desc_info">{postList.length}</div>
                      </div>
                      <div className="subtit_info tit_qna">
                        <span className="tit_info">정보 더보기</span>
                        <span className="ico_ks ico_plus"/>
                      </div>
                    </div>
                  </div>

                  <div className="section_widgets">
                    <h3 className="tit_widgets" style={{paddingTop: "15px"}}>최근 키워드 </h3>
                    <div className="keyword_widgets">
                      <p className="link_keyword">#키워드</p>
                      <p className="link_keyword">#키키워드</p>
                      <p className="link_keyword">#키키키워드</p>
                    </div>
                  </div>

                  <div className="section_widgets">
                    <h3 className="tit_widgets" style={{paddingTop: "15px"}}>추천친구</h3>
                    <div className="keyword_widgets">
                      {/*<FriendItem listName={"storyWidgets"}/>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default UserStory;
