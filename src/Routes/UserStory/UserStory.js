import React from 'react';
import './UserStory.css';
import StoryItem from "../../Component/StoryItem/StoryItem";
import FriendItem from "../../Component/FriendItem/FriendItem";
import {
  getUserInfo,
  updateUserProfileImg,
  updateUserBgImg,
  getUserPosts,
  getUserFriends
} from "../../services/DataService";
import {fileToDataURL} from "../../services/fileToDataURL";
import eventService from "../../services/EventService";
import {MyMenu} from "../../Component/MyMenu/MyMenu";
import {LoadingIndicator} from "../../services/LoadingIndicator";
import {ProfileSettingItem} from "../../Component/ProfileSettingItem/ProfileSettingItem";

class UserStory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenuIdx: 0,
      posterInfo: null,
      isBgMenuFade: false,
      postList: [],
      sideMemoFixed: false,
      viewCnt: 5,
      loading: false,
      loginUserFriendsList: [],
      isFriend: false,

      infoType: this.props.match.params.type
    };
    // console.log(props.match.params.userId);
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.loadUserInfo();
    this.reloadLoginUserFriends();
    document.addEventListener("scroll", e => {
      // console.log(e);
      if (window.scrollY >= 364) {
        this.setState({sideMemoFixed: true});
      } else {
        this.setState({sideMemoFixed: false});
      }
    })
  }

  componentDidMount() {
    this.loadUserInfo();

    window.addEventListener('scroll', (e) => {
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if ((scrollTop + clientHeight) >= scrollHeight) {
        setTimeout(() => {
          this.setState({loading: false, viewCnt: this.state.viewCnt + 5});
        }, 1000);
        this.setState({loading: true});
      }
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props.match.params, prevProps.match.params);
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.loadUserInfo();
      this.reloadLoginUserFriends();
    } else if(this.props.match.params.type !== prevProps.match.params.type) {
      this.setState({infoType: this.props.match.params.type})
    }
  }

  reloadLoginUserFriends = () => {
    getUserFriends(this.nowUserInfo.id, (data) => {
      // console.log(data);
      this.setState({isFriend: false});
      data.friends.forEach((v,i) => {
        if(this.props.match.params.userId === v.friend) {
          this.setState({isFriend: true});
        }
        // console.log(this.props.match.params.userId, v.friend);
      });
      // console.log(this.state.isFriend);
    });
  };

  loadUserInfo = () => {
    getUserInfo(this.props.match.params.userId, (udata) => {
      // console.log(udata.data);
      this.setState({posterInfo: []});
      this.setState({posterInfo: udata.data});
      this.getPostEvent();
      // console.log("userStory: ", udata.data);
      // 바꿔야 함... 여긴 항상 로그인 유저만 오는 것이 아님. <= (바꿈)

      if (this.nowUserInfo.id === this.props.match.params.userId) {
        localStorage.setItem("userInfo", JSON.stringify(udata.data));
        eventService.emitEvent("changeUserProfile");
      }
    });
  };

  getPostEvent = () => {
    getUserPosts(this.props.match.params.userId, (data) => {
      console.log(data);
      if (data.posts !== undefined) {
        let arr = data.posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        if(this.nowUserInfo.id !== this.props.match.params.userId) {
          arr = arr.filter(v => Number(v.isprivate_num) !== 1);
          console.log(arr);
        }
        this.setState({postList: []});
        this.setState({postList: arr});
      }
    });
  };

  storyLinkEvent = (e) => this.setState({selectedMenuIdx: Number(e.target.dataset.midx)});
  showBgMenu = () => this.setState({isBgMenuFade: (this.state.isBgMenuFade) ? false : true});

  changeUserProfileImg = (e) => {
    fileToDataURL(e.target.files[0]).then(res => {
      updateUserProfileImg({userid: JSON.parse(localStorage.getItem("userInfo")).id, img: res}, () => {
        this.loadUserInfo();
      });
    });
  };

  changeUserBgImg = () => {
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
    // console.log("selectRandomBgImg: ", e);
    console.log(e.target.files);
    fileToDataURL(e.target.files[0]).then(res => {
      updateUserBgImg({userid: JSON.parse(localStorage.getItem("userInfo")).id, img: res}, () => {
        this.loadUserInfo();
      });
    });
  };


  render() {
    if (this.state.posterInfo == null) return (<div/>);
    const menus = ["전체", "캘린더", "사진", "동영상", "장소", "뮤직", "더보기+6"];
    const menuClass = (i) => `story_link ${i === this.state.selectedMenuIdx ? "story_link_on" : ""}`;
    const {posterInfo, postList, sideMemoFixed, infoType, isFriend} = this.state;
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
                  (posterInfo.profileimg == null) ? (<div className="link_pf bg_pf"/>) :
                    (<div className="link_pf userProfileImg"
                          style={{backgroundImage: `url(${posterInfo.profileimg})`}}/>)
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
                                      <div className="btn_friend_cover">친구</div>
                                      <div className="area_ico">
                                        <span className="ico_ks ico_open"/>
                                      </div>
                                    </>) :
                        (<div className="btn_cover">친구신청</div>)
                  }

                  {(this.state.isBgMenuFade) ? (
                    <MyMenu menuInfo={[{text: "사진 업로드", type: "file", eventCallback: this.selectRandomBgImg},
                      {text: "기본 이미지", type: "normal", eventCallback: (e) => this.changeUserBgImg(e)}]} menuStyle={{marginTop: "35px"}}/>) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="story_cont">
            <div className="story_post_wrap">

              {
                (infoType !== "profileSetting") ?
                  this.state.postList.map((v, i) => (i < this.state.viewCnt) ? (
                  <StoryItem key={i} postData={v} arrnum={i} userData={[{
                    userid: posterInfo.id, name: posterInfo.name, profileimg: posterInfo.profileimg,
                  }]}/>) : null) :
                  (
                    <ProfileSettingItem loadUserInfo={this.loadUserInfo}/>
                  )
                //updatePostEvent={this.updatePostEvent} deletePostEvent={this.deletePostEvent}
              }

              {
                (infoType !== "profileSetting") ?
                (this.state.loading) ? (<div style={{textAlign: "center", margin: "30px 0"}}>
                  <div className="spinner-border text-warning"/>
                </div>) : (<LoadingIndicator/>)
                  : null
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
