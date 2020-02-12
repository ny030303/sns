import React from 'react';
import './FriendItem.css';
import {addApplyFriend, addFriend, deleteFriend, excludeRecommendFriend} from "../../services/DataService";
import alertDialog from "../../services/AlertDialog";
import eventService from "../../services/EventService";
import {withRouter} from "react-router-dom";
import waitDialog from "../../services/WaitDialog/WaitDialog";

class FriendItem extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
    };
    // waitDialog.show();
  }


  refuseEvent = () => {
    switch (this.props.listName) {
      case "AcceptList":  // 받은 신청 (delete element + delete request(1) friend table)
        console.log("props data: ", this.props.data);
        waitDialog.show();
        deleteFriend(this.props.data.userid, this.state.userInfo.id, 1, (v) => {
          waitDialog.hide();
          eventService.emitEvent("reloadFriends", {
            id: this.props.data.userid,
            type: "accept",
          });
        });
        break;
      case "recommendList": // 추천 친구 (delete element + insert request(0) friend table)
        waitDialog.show();
        excludeRecommendFriend(this.state.userInfo.id, this.props.data.id, (res) => {
          waitDialog.hide();
          eventService.emitEvent("reloadFriends", {
            id: this.props.data.id,
            type: "recommend",
          });
        });
        break;
    }
  };

  agreeEvent = () => {
    switch (this.props.listName) {
      case "AcceptList":  // 받은 신청 (delete element + update request(100) friend table + insert request(100)[상대 꺼 만들어주기])
        waitDialog.show();
        addFriend({
          userid: this.state.userInfo.id,
          friend: this.props.data.userid
        }, (res) => {
          waitDialog.hide();
          eventService.emitEvent("reloadFriends", {
            id: this.props.data.userid,
            type: "accept",
          });
        });
        break;
      case "recommendList": // 추천 친구 추가(delete element + insert request(1) friend table)
        waitDialog.show();
        addApplyFriend(this.state.userInfo.id, this.props.data.id, (res) => {
          eventService.emitEvent("reloadFriends", {
            id:  this.props.data.id,
            type: "recommend",
          });
          waitDialog.hide();
        });
        break;
    }
  };

  onProfileClick = (e) => {
    e.preventDefault();
    this.props.history.push(`/story/${this.props.data.id}/main`);
  };

  render() {
    const {data} = this.props;
    // console.log(data);
    return (
      <li className="friendItem" >
        {
          (data.profileimg === null) ?
            (<span className="frame_type3 frame_g img_profile" onClick={this.onProfileClick}/>) :
            (<span className="friendItemProfileImg frame_type3 frame_g"
                   style={{backgroundImage: `url(${data.profileimg})`}}
                   onClick={this.onProfileClick}/>)
        }

        <span className="thumb_name">{data.name}</span>
        {
          (this.props.listName === "friendsList") ?
            (<div className="friendItemIconWrap">
              <span className="ico_ks ico_message">쪽지 보내기</span>
              <span className="ico_ks ico_add">관심친구 해제</span>
            </div>) :
            (<div className="friendItemIconWrap"
                  style={(this.props.listName === "AcceptList") ? {display: "flex"} : {}}>
              <span className="ico_ks btn_defy" onClick={this.refuseEvent}>무시</span>
              <span className="ico_ks btn_accept" onClick={this.agreeEvent}>수락</span>
            </div>)
        }

      </li>
    )
  }
}

export default withRouter(FriendItem);
