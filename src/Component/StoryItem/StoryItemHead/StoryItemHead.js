import * as React from 'react';
import {MyMenu} from "../../MyMenu/MyMenu";
import {updateStoryIsPrivateNum} from "../../../services/DataService";
import {withRouter} from "react-router-dom";

class StoryItemHead extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSettingMenuFade: false,
    };

    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  changeIsPrivateNum = (e) => {
    console.log(e.target.dataset.num);
    let data = {
      postid: this.props.postData.id,
      isprivate_num: e.target.dataset.num,
    };
    updateStoryIsPrivateNum(data, (res) => {
      console.log(res);
    });
  };

  showSettingMenu = (e) => {
    console.log(e);
    this.setState({isSettingMenuFade: !this.state.isSettingMenuFade});
    console.log(this.state.isSettingMenuFade);
  };

  moveUserStoryMain = (e) => {
    e.preventDefault();
    this.props.history.push(`/story/${this.props.postData.userid}/main`);
  };

  render() {
    const {postData, userData} = this.props;
    let nowPoster = userData.filter(v => postData.userid === v.userid)[0];
    return (
      <div>
        <div className="storyContentsWrap">
          {
            (nowPoster.profileimg == null) ?
              (
                <span className="img_profile frame_g frame_type6" onClick={this.moveUserStoryMain}>
                  <span className="img_profile line"/>
                </span>
              ) : (
                <span className="img_profile frame_g storyItemProfileImg"
                      style={{backgroundImage: `url(${nowPoster.profileimg})`}}
                      onClick={this.moveUserStoryMain}>
                  <span className="img_profile line"/>
                </span>
              )
          }

          {/*          style={{backgroundImage:`url(${this.nowPoster.profileimg})`}} */}
          <div className="btn_top_group">
            <span className="ico_ks btn_save" uk-tooltip="관심글로 저장하기"/>
            <span className="ico_ks bn_modify"
                  data-user={postData.userid} onClick={this.showSettingMenu}/>
            {
              (this.state.isSettingMenuFade) ?
                (postData.userid === this.nowUserInfo.id) ?
                  (<MyMenu menuInfo={[
                    {
                      text: "수정",
                      type: "normal",
                      data_set: postData.id,
                      data_set2: 0,
                      eventCallback: this.props.updatePostEvent
                    },
                    {
                      text: "삭제",
                      type: "normal",
                      data_set: postData.id,
                      data_set2: 0,
                      eventCallback: this.props.deletePostEvent,
                      style: {borderBottom: "1px solid #e5e5e5"}
                    },
                    {
                      text: "전체공개",
                      icon: "ico_ks global",
                      type: "checkBox",
                      data_set: 3,
                      eventCallback: this.changeIsPrivateNum
                    },
                    {
                      text: "친구공개",
                      icon: "ico_ks ic_friend",
                      type: "checkBox",
                      data_set: 2,
                      eventCallback: this.changeIsPrivateNum
                    },
                    {
                      text: "나만보기",
                      icon: "ico_ks ic_lock",
                      type: "checkBox",
                      data_set: 1,
                      eventCallback: this.changeIsPrivateNum
                    },
                  ]} menuStyle={{left: "-91px"}}/>) :
                  (<MyMenu menuInfo={[
                    {text: "글 숨기기", type: "normal"},
                  ]} menuStyle={{width: "141px", left: "-103px"}}/>)
                : null
            }
          </div>
          <div className="add_top">
            {/*2020-01-22 14:06:08*/}
            <div style={{paddingBottom: "2px"}}
                 className="pf_name">{nowPoster.name}</div>
            <div className="storyitem_font_style">
              {postData.created.substr(0, 4)}년&nbsp;
              {postData.created.substr(5, 2)}월&nbsp;
              {postData.created.substr(8, 2)}일&nbsp;
              {Number(postData.created.substr(11, 2)) < 12 ? "오전" : "오후"}&nbsp;
              {Number(postData.created.substr(11, 2)) < 12 ? postData.created.substr(11, 2)
                : Number(postData.created.substr(11, 2)) - 12}:
              {postData.created.substr(14, 2)}
              {
                (postData.isprivate_num != 3) ?
                  (<div style={{display: "inline-block"}}>
                    <span className="ico_ks ico_dot"/>
                    <span
                      className={`ico_ks ${(postData.isprivate_num == 2) ? "ic_friend" : (postData.isprivate_num == 1) ? "ic_lock" : null}`}/>
                  </div>) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(StoryItemHead);