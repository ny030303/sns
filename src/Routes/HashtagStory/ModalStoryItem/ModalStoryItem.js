import * as React from 'react';
import "./ModalStoryItem.css";
import StoryItem from "../../../Component/StoryItem/StoryItem";
import {deletePost, getStoryUserData} from "../../../services/DataService";
import eventService from "../../../services/EventService";

export class ModalStoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  updatePostEvent = (e) => {
    let postid = e.target.dataset.num;
    let editPost = this.state.postList.find(v => v.id === postid);
  };

  deletePostEvent = (e) => {
    let postid = e.target.dataset.num;
    console.log('postid:', postid, this.state.postList);
    deletePost(postid, (res) => {
      console.log(res);
      if (res.result === 1) {
        // this.getPostEvent();
        this.setState({postList: this.state.postList.filter(v => postid !== v.id)})
      }
      console.log('result:', res.result, this.state.postList);
    });
  };

  render() {
    console.log(this.props.post);
    let userTemp = getStoryUserData(this.props.post.userid);
    let userDatas = [{
      userid: this.props.post.userid,
      name: userTemp.name,
      profileimg: userTemp.img
    }];
    return (
      <div className="modalStoryItem">
        <div className="modalStoryItem_back" onClick={this.props.hideStoryItem}/>
        <div style={{position: "absolute", top: "6%", left: "50%", transform: "translate(-50%,0)"}}>
          <StoryItem postData={this.props.post} arrnum={0}
                     userData={userDatas}
                     updatePostEvent={this.updatePostEvent}
                     deletePostEvent={this.deletePostEvent}/>
        </div>
        <span className="ico_ks btn_feed_close" onClick={this.props.hideStoryItem}>
          <button type="button" className="_btnClose" data-kant-id="667"
                  data-kant-group="dtl"><span>닫기</span></button>
        </span>
      </div>
    )
      ;
  };
};