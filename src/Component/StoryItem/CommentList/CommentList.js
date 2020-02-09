import * as React from 'react';
import "./CommentList.css";
import CommentItem from "./CommentItem/CommentItem";
import {CommentWriting} from "../../CommentWriting/CommentWriting";
import {getComments} from "../../../services/DataService";


export class CommentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.input = React.createRef();
    // this.loadComments();
  }

  onAddComment = (comment) => {
    let comments = this.props.comments || [];
    comments.push(comment);
    this.props.onUpdateComments(comments);
  };

  onUpdateComment = (dataid, comment) => {
    let comments = this.props.comments || [];
    let idx = comments.findIndex(v => v.id === dataid);
    if( idx >= 0 ) {
      if( comment === null ) { // delete
        comments.splice(idx, 1);
      }
      else { // update
        comments[idx] = comment;
      }
      this.props.onUpdateComments(comments);
    }
  };

  render() {
    // console.log(this.props.comments);
    let comments = this.props.comments || [];
    return (
      <div className="commentList">
      <CommentWriting postid={this.props.postid} type={"normal"} onAddComment={this.onAddComment}/>

        <ul className="commentItemsWrap">
          {
            comments.map((v,i) => (
              <CommentItem key={i} data={v} postid={this.props.postid} onUpdateComment={this.onUpdateComment}/>
            ))
          }
        </ul>
      </div>
    );
  };
};