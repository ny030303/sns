import React from 'react';
import './MyRightHeader.css';
import FriendItem from "../Component/FriendItem/FriendItem";
import MessageItem from "./NoteItem/MessageItem";
import {withRouter} from "react-router-dom";
import eventService from "../services/EventService";

class MyRightHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),

    };
    // eventService.listenEvent("appLogined", logined => {
    //     if( logined ) this.setState({userInfo: window.userInfo});
    // });
  }

  render() {
    const {userInfo} = this.state;
    if (!userInfo) return null;
    return (
      <div className="snb_story">
        <div className="inner_snb">
          <div className="snb_profile">
            <div className="wrap_thumb">
              <div className="img_profile right_header_profile_img_wrap" style={{cursor:"pointer"}} onClick={() => this.props.history.push("/story")}>
                <img className="right_header_profile_img"/>
              </div>
              <div className="right_header_profile_name">{userInfo.name}</div>
            </div>
            <div className="settingContainer">
              <div className="settingIcon">
                <span className="ico_ks ico_util">설정 메뉴</span>
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
              style={{fontSize: "14px", fontWeight: "bold", color: "#696969"}}>
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
                <span className="_count">33</span>
              </div>
              <div className="friends_list_wrap"
                   style={{overflow: "hidden", height: "61vh", width: "100%", overflowY: "scroll"}}>
                <ul className="friends_list" style={{height: "93%", margin: "0"}}>
                  {/*friendItem 정보 넣기*/}

                  <FriendItem listName={"friendsList"}/>
                </ul>
              </div>
              <div className="cate_channel">
                                <span className="fontStyle1" style={{padding: "0 0 0 13px"}}>소식받는
                                    <span className="ico_ks ico_arrow"/>
                                </span>
              </div>
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
                  <span className="_count">33</span>
                </div>
                <ul className="friends_list" style={{margin: "0"}}>
                  {/*friendItem 정보 넣기*/}
                  <FriendItem listName={"requestList"}/>
                </ul>
                <div className="fontStyle1 recommendFontStyle">
                  <span className="_title">추천 친구 </span>
                  <span className="_count">33</span>
                </div>
                <ul className="friends_list" style={{margin: "0"}}>
                  {/*friendItem 정보 넣기*/}
                  <FriendItem listName={"recommendList"}/>
                </ul>
              </div>

            </div>
            <div id="menu2" className="tab-pane fade">
              <div className="btn_message">
                <div className="grayColorBtn">새 쪽지 작성</div>
                <div className="friends_list_wrap"
                     style={{overflow: "hidden", height: "626px", width: "100%", overflowY: "scroll"}}>
                  <ul className="friends_list" style={{height: "100%", margin: "0"}}>
                    {/*friendItem 정보 넣기*/}
                    <MessageItem/>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MyRightHeader);
