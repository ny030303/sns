import React from 'react';
import './StoryItem.css';
import 'react-image-lightbox/style.css';
import {CommentList} from "./CommentList/CommentList";
import {getComments, getUserFriends} from "../../services/DataService";
import StoryItemBody from "./StoryItemBody/StoryItemBody";
import StoryItemTail from "./StoryItemTail/StoryItemTail";
import StoryItemHead from "./StoryItemHead/StoryItemHead";

export const StoryItemLoading = () => (
  <div style={{textAlign: "center", margin: "30px 0", height: "300px"}}>
    <div className="spinner-border text-warning"/>
  </div>
);

class StoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      isFriend: false
    };
  }

  componentDidMount() {
    this.updateComments(this.props.postData);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.postData !== this.props.postData) {
      this.updateComments(this.props.postData);
      this.reloadLoginUserFriends();
    }
  }

  updateComments = (postData) => {
    getComments(postData.id, (cData) => {
      if (postData.onUpdateComments) postData.onUpdateComments(cData.data);
    });
  };

  reloadLoginUserFriends = () => {
    getUserFriends(this.state.userInfo.id, (data) => {
      this.setState({isFriend: false});
      data.friends.forEach((v, i) => {
        if (this.props.postData.userid === v.friend) {
          this.setState({isFriend: true});
        }
      });
    });
  };


  render() {
    const {postData} = this.props;
    // console.log(postData);
    let comments = postData.comments || [];
    let feelingCnt = 0;
    postData.feeling.split("|").forEach(v => feelingCnt += (( v.length > 2) ?  1 : 0));
    return (
      <div className="StoryItem section" style={(postData.upid) ? {paddingTop: "26px"} : null}>
        <div className="storyContentsWrap">
          <StoryItemHead postData={this.props.postData} userData={this.props.userData}
                         updatePostEvent={this.props.updatePostEvent}
                         deletePostEvent={this.props.deletePostEvent}/><br/><br/><br/>
          <StoryItemBody postData={postData}/>
          <br/>
          <StoryItemTail postData={postData}/>

          <div className="storyCommentsWrap">
            <div className="count_group">
              <p>느낌 <span>{feelingCnt}</span></p>
              <p>댓글 <span>{comments.length}</span></p>
              <p>공유 <span>{Number(postData.sharing)}</span></p>
              <p>UP <span>{isNaN(postData.up) ? 0 : Number(postData.up)}</span></p>
            </div>

            <CommentList
                comment_private_num={postData.comment_private_num} isFriend={this.state.isFriend}
                postData_userid={postData.userid}
                comments={comments} postid={postData.id} onUpdateComments={postData.onUpdateComments}/>
          </div>
        </div>
      </div>
    )

  }
}

export default StoryItem;
