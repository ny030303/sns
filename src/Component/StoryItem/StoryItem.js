import React from 'react';
import './StoryItem.css';
import 'react-image-lightbox/style.css';
import {CommentList} from "./CommentList/CommentList";
import {
  updatePostFeeling,
  deletePostFeeling,
  getComments,
  getPostFeeling,
  updateStoryIsPrivateNum
} from "../../services/DataService";
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
    };
  }

  componentDidMount() {
    this.updateComments(this.props.postData);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if( prevProps.postData !== this.props.postData ) {
      this.updateComments(this.props.postData);
    }
  }

  updateComments = (postData) => {
    getComments(postData.id, (cData) => {
      if( postData.onUpdateComments ) postData.onUpdateComments(cData.data);
    });
  };

  render() {
    const {postData} = this.props;
    let comments = postData.comments || [];
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
              <p>느낌 <span>{postData.feeling ? postData.feeling.split("|").length : 0}</span></p>
              <p>댓글 <span>{comments.length}</span></p>
              <p>공유 <span>{Number(postData.sharing)}</span></p>
              <p>UP <span>{isNaN(postData.up) ? 0 : Number(postData.up)}</span></p>
            </div>
            <CommentList comments={comments} postid={postData.id} onUpdateComments={postData.onUpdateComments}/>
          </div>
        </div>
      </div>
    )

  }
}

export default StoryItem;
