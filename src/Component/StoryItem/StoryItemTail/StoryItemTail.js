import * as React from 'react';
import {addPostUp, deletePostUp, updatePostFeeling} from "../../../services/DataService";
import eventService from "../../../services/EventService";

export default class StoryItemTail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feelingCnt: 0,
      isUpOn: false,
      feelings: null
    };
    this.myFeeling = "";
    this.feelIcons = [
      "bn_feel",
      "bn_like",
      "bn_pleasure",
      "bn_sad",
      "bn_cheerup",
      "bn_good",
    ];
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  componentDidMount() {
  }

  feelIconEvent = (e) => {
    let fnum = e.target.dataset.fnum;
    this.updateFeelingToPost(this.feelIcons[fnum]);
  };

  nowFeelIconEvent = () => {
    this.updateFeelingToPost((this.myFeeling && this.myFeeling.feeling) ? "" : "bn_like");
  };

  deleteFeelingToPost = (feeling) => {
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid: this.nowUserInfo.id, feeling: ""})
    };
    //deletePostFeeling(data, (res) => eventService.emitEvent("feelingUpdate", data));
    updatePostFeeling(data, (res) => {
      console.log(res);
      if( res.result === 1 ) {
        eventService.emitEvent("feelingUpdateToMainAndUserStory", res.data);
      }
    });
  };

  updateFeelingToPost = (feeling) => {
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid: this.nowUserInfo.id, feeling: feeling})
    };
    updatePostFeeling(data, (res) => {
      console.log(res);
      if( res.result === 1 ) {
        eventService.emitEvent("feelingUpdateToMainAndUserStory", res.data)
      }
    });
  };

  onUpClickEvent = () => {
    console.log(this.props.postData);

    if (this.state.isUpOn) { // 삭제
      deletePostUp(this.props.postData.id, this.nowUserInfo.id, (res) => {
        console.log(res);
      });
    }
    else { // 추가
      addPostUp(this.props.postData.id, this.nowUserInfo.id, (res) => {
        console.log(res);
      });
    }
    this.setState({isUpOn: !this.state.isUpOn});
  };

  render() {
    const {postData} = this.props;
    let feelIconClass = "";
    let feelings = postData.feeling ? postData.feeling.split("|").map(v => JSON.parse(v || "{}")) : [];
    if (postData.feeling) {
      this.myFeeling = feelings.find(v => v.userid === this.nowUserInfo.id);
      feelIconClass = this.myFeeling ? this.myFeeling.feeling : feelIconClass;
    }
    else {
      this.myFeeling = null;
    }
    return (
      <div>
        <div className="storyContentsWrap">
          <div className="storyitem_icon_wrap">
            <div onClick={this.nowFeelIconEvent} className={`ico_ks2 bn_feel ${feelIconClass}`} id="nowFeelIcon"/>
            {
              feelIconClass ? null : (
                <div className="selectFeelIcons">
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_like selectFeelIconStyle" data-fnum="1"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_pleasure selectFeelIconStyle" data-fnum="2"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_sad selectFeelIconStyle" data-fnum="3"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_cheerup selectFeelIconStyle" data-fnum="4"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_good selectFeelIconStyle" data-fnum="5"/>
                </div>
              )
            }

            <div className="ico_ks2 bn_share"/>
            <div className={`ico_ks2 bn_up ${(this.state.isUpOn) ? "on" : ""}`} onClick={this.onUpClickEvent}/>
            <div className="relative feelingUserIconWrap" style={{display: "inline-block"}}>
              {
                (feelIconClass !== "") ? (this.nowUserInfo.profileimg == null) ?
                  (<div className="storyItem_feeling_user_img_wrap">
                    <span className="img_profile storyItem_frame_g"/>
                    <span className={this.state.feelIconClass}/>
                  </div>) :
                  (<div className="storyItem_feeling_user_img_wrap">
                    <span className="img_profile storyItem_feeling_user_img"
                          style={{backgroundImage: `url(${this.nowUserInfo.profileimg})`}}/>
                    <span className={feelIconClass}/>
                  </div>) : null
              }
              {
                (feelings.length <= 0) ? null :
                  (<div className="bn_morelike">+{feelings.length - (feelIconClass !== "") ? 1 : 0}</div>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};