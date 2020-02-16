import React from 'react';
import './MyRightHeader.css';
import FriendItem from "../Component/FriendItem/FriendItem";
import MessageItem from "./NoteItem/MessageItem";
import {withRouter} from "react-router-dom";
import eventService from "../services/EventService";
import {getFriends, getApplyFriends, getRecommendFriend, logout} from "../services/DataService";
import {MyMenu} from "../Component/MyMenu/MyMenu";
import {MessageWriting} from "../Component/MessageWriting/MessageWriting";
import * as uikit from "uikit/dist/js/uikit.min";
import SnsMessage from "./SnsMessage/SnsMessage";

// class UserInfo {
//   constructor()  {
//     this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   }
//   get() {
//     return this.userInfo;
//   }
//
//   put(data) {
//     this.userInfo = data;
//     localStorage.getItem("userInfo", data);
//   }
// }

class MyRightHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      friendsList: [],
      acceptFriendList: [],
      recommendFriendList: [],
      isMessageWritingFade: false,

    };
    this.msgData = null;

    this.updateFrientEvent(this.state.userInfo);
    eventService.listenEvent("reloadFriends", data => {
      // console.log(data);
      this.updateFrientEvent(this.state.userInfo);
      switch (data.type) {
        case "accept":
          this.setState({acceptFriendList: this.state.acceptFriendList.filter(v => v.id !== data.id)});
          break;
        case "recommend":
          this.setState({recommendFriendList: this.state.recommendFriendList.filter(v => v.id !== data.id)});
          break;
      }
    });

    eventService.listenEvent("changeUserProfile", data => {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.setState({userInfo: userInfo});
    })
  }

  updateFrientEvent = (userInfo) => {
    if (userInfo) {
      this.getFriendEvent(userInfo);
      this.getRecommendFriendEvent(userInfo);
    }
  };

  componentDidMount() {
    eventService.listenEvent("reloadFriendListToRightHeader", () => {
      this.updateFrientEvent(this.state.userInfo);
    });
  }

  getFriendEvent = () => {
    if (this.state.userInfo === null) return;
    getFriends(this.state.userInfo.id, 1, (fData) => { // 친구목록
      console.log(fData);
      this.setState({friendsList: fData.friends, acceptFriendList: fData.acceptFriends});
      eventService.emitEvent("getFriends");
    });
  };

  getRecommendFriendEvent = () => {
    if (this.state.userInfo === null) return;
    let arr = [];
    eventService.listenEvent("getFriends", () => {
      this.state.friendsList.forEach(v => arr.push(v.id));
      // console.log(arr);
      let data = {userid: this.state.userInfo.id, friend_list: arr};
      getRecommendFriend(data, (data) => {
        if (data.data !== undefined) this.setState({recommendFriendList: data.data});
        // console.log(this.state.recommendFriendList);
      });
    });
  };

  // getSendFriendEvent = () => {
  //   if (this.state.userInfo === null) return;
  //   getFriends(this.state.userInfo.id, 1, (fData) => { // 보낸 신청 목록
  //     // console.log(fData);
  //     if (fData.friends !== undefined) this.setState({acceptFriendList: fData.friends});
  //   });
  // };

  logoutEvent = () => {
    localStorage.removeItem("userInfo");
    eventService.emitEvent("loginStatus", false);
    logout((data) => {
      console.log(data)
    });
  };

  showMessageWriting = (e, msgData) => {
    console.log(msgData);
    this.msgData = msgData || null;
    this.setState({isMessageWritingFade: !this.state.isMessageWritingFade});
  };



  render() {
    const {userInfo} = this.state;
    // console.log(userInfo);
    if (!userInfo) return null;
    return (
      <>
        {(this.state.isMessageWritingFade) ?
          <MessageWriting data={this.msgData} updateMessage={this.updateMessage} closeMessageWriting={this.showMessageWriting}/> : null}

        <div className="snb_story">
          <div className="inner_snb">
            <div className="snb_profile">
              <div className="wrap_thumb">
                <div className={(userInfo.profileimg == null) ? "img_profile right_header_normal_profile_wrap"
                  : "right_header_profile_img_wrap"} style={{cursor: "pointer"}}
                     onClick={() => this.props.history.push(`/story/${userInfo.id}/main`)}>
                  {
                    (userInfo.profileimg == null) ?
                      (<div className="right_header_normal_profile"
                            style={{backgroundImage: `url(${userInfo.profileimg})`}}/>) :
                      (<div className="right_header_normal_profile right_header_profile_img"
                            style={{backgroundImage: `url(${userInfo.profileimg})`}}/>)
                  }
                </div>
                <div className="right_header_profile_name">{userInfo.name}</div>
              </div>
              <div className="settingContainer">
                <div className="uk-inline">
                  <div className="settingIcon">
                    <span className="ico_ks ico_util">설정 메뉴</span>
                  </div>
                  <MyMenu menuInfo={[
                    {
                      text: "프로필 설정", type: "normal", eventCallback: () => {
                        this.props.history.push(`/story/${userInfo.id}/profileSetting`)
                      }
                    },
                    {
                      text: "일반 설정", type: "normal", eventCallback: () => {
                        this.props.history.push(`/setting`)
                      }
                    },
                    {text: "로그아웃", type: "normal", eventCallback: this.logoutEvent}]}
                          menuStyle={{top: "100px", left: "-30px"}} menuPos={"bottom-center"}/>
                </div>


              </div>
              <div className="menuContainer">
                <div className="menuIcon">
                  <span className="ico_ks ico_mystory">메뉴</span>
                </div>
              </div>
            </div>
            <br/>
            {/*친구목록*/}
            <ul className="nav nav-tabs nav-justified tab_friend"
                style={{fontSize: "14px", fontWeight: "bold", color: "#696969", margin: 0}}>
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#home">친구</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu1">신청</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu2">쪽지</a>
              </li>
            </ul>

            <div className="tab-content">
              <div id="home" className="tab-pane active"
                   style={{padding: "0 0 0 15px", position: "relative"}}>
                <div className="txt_title fontStyle1">
                  <span className="_title">내 친구 </span>
                  <span className="_count">{this.state.friendsList.length}</span>
                </div>
                <div className="friends_list_wrap"
                     style={{overflow: "hidden", height: "63vh", width: "100%", overflowY: "scroll"}}>
                  <ul className="friends_list" style={{height: "93.5%", margin: "0"}}>
                    {
                      this.state.friendsList.map((v, i) => (
                        <FriendItem key={i} data={v} fnum={i} listName={"friendsList"}/>))
                    }
                  </ul>
                </div>
                {/*<div className="cate_channel">*/}
                {/*  <span className="fontStyle1" style={{padding: "0 0 0 13px"}}>소식받는*/}
                {/*      <span className="ico_ks ico_arrow"/>*/}
                {/*  </span>*/}
                {/*</div>*/}
                <div className="box_searchbar">
                <span className="fontStyle1" style={{padding: "0 0 0 13px"}}>친구 검색
                    <span className="ico_ks ico_search"/>
                </span>
                </div>
              </div>
              <div id="menu1" className="tab-pane fade" style={{padding: "0 0 0 15px", position: "relative"}}>
                <div className="friends_list_wrap"
                     style={{overflow: "hidden", height: "671px", width: "100%", overflowY: "scroll"}}>
                  <div className="fontStyle1 requestFontStyle">
                    <span className="_title">받은 신청 </span>
                    <span
                      className="_count">{(this.state.acceptFriendList.length === undefined) ? 0 : this.state.acceptFriendList.length}</span>
                  </div>
                  <ul className="friends_list" style={{margin: "0"}}>
                    {
                      this.state.acceptFriendList.map((v, i) => (
                        <FriendItem key={i} data={v} fnum={i} listName={"AcceptList"}/>))
                    }
                  </ul>
                  <div className="fontStyle1 recommendFontStyle">
                    <span className="_title">추천 친구 </span>
                    <span className="_count">{this.state.recommendFriendList.length}</span>
                  </div>
                  <ul className="friends_list" style={{margin: "0"}}>
                    {
                      this.state.recommendFriendList.map((v, i) => (
                        <FriendItem key={i} data={v} fnum={i} listName={"recommendList"}/>))
                    }
                  </ul>
                </div>

              </div>
              <div id="menu2" className="tab-pane fade">
                <SnsMessage showMessageWriting={this.showMessageWriting} userInfo={this.state.userInfo}/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(MyRightHeader);
