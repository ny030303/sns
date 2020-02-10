import React from 'react';
import './StoryItem.css';
import 'react-image-lightbox/style.css';
import {CommentList} from "./CommentList/CommentList";
import {
  addPostFeeling,
  deletePostFeeling,
  getComments,
  getPostFeeling,
  updateStoryIsPrivateNum
} from "../../services/DataService";
import StoryItemBody from "./StoryItemBody/StoryItemBody";
import StoryItemTail from "./StoryItemTail/StoryItemTail";
import StoryItemHead from "./StoryItemHead/StoryItemHead";

class StoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      userInfo: [],

      feelingCnt: 0
    };

  }

  render() {
    const {postData} = this.props;
    let comments = postData.comments || [];
    return (
      <div className="StoryItem section">
        <div className="storyContentsWrap">
          <StoryItemHead postData={this.props.postData} userData={this.props.userData}
                         updatePostEvent={this.props.updatePostEvent}
                         deletePostEvent={this.props.deletePostEvent}/><br/><br/><br/>
          <StoryItemBody postData={this.props.postData}/>
          <br/>
          <StoryItemTail postData={this.props.postData} onFeelingCnt={(data) => this.setState({feelingCnt: data})}/>

          <div className="storyCommentsWrap">
            <div className="count_group">
              <p>느낌 <span>{this.state.feelingCnt}</span></p>
              <p>댓글 <span>{Number(comments.length)}</span></p>
              <p>공유 <span>{Number(postData.sharing)}</span></p>
              <p>UP <span>{Number(postData.up)}</span></p>
            </div>
            <CommentList comments={comments} postid={this.props.postData.id} onUpdateComments={this.props.postData.onUpdateComments}/>
          </div>
        </div>
      </div>
    )

  }
}

export default StoryItem;
