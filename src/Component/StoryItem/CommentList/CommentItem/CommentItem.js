import React from 'react';
import './CommentItem.css';
import {
  addCommentHeart,
  deleteComment,
  deleteCommentHeart,
  getCommentHeart,
  getStoryUserData
} from "../../../../services/DataService";
import {withRouter} from "react-router-dom";
import {CommentWriting} from "../../../CommentWriting/CommentWriting";

const fn_dateTimeToFormatted = (dt) => {
  let min = 60 * 1000;
  let c = new Date();
  let d = new Date(dt);
  let minsAgo = Math.floor((c - d) / (min));

  let result = {
    'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' +
      (d.getDate() > 9 ? '' : '0') + d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +
      d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') + d.getMinutes() + ':' +
      (d.getSeconds() > 9 ? '' : '0') + d.getSeconds(),
    'formatted': '',
  };

  if (minsAgo < 60) { // 1시간 내
    result.formatted = minsAgo + '분 전';
  }
  else if (minsAgo < 60 * 24) { // 하루 내
    result.formatted = Math.floor(minsAgo / 60) + '시간 전';
  }
  else { // 하루 이상
    result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
  }

  return result;
};

class CommentItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posterInfo: null,
      heartClass: "", // heart_on
      hearts: [],
      heartsCnt: 0,

      isEditOn: false
    };
    this.loadCommentHeart();
    this.contents = React.createRef();
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  commentHeartEvent = (e) => {
    // console.log(e.target);
    if (this.state.heartClass.length < 2) {
      this.setState({heartClass: "heart_on", heartsCnt: this.state.heartsCnt + 1});
      e.target.innerHTML = "좋아요 취소";
      let data = {
        heartInfo: JSON.stringify({userid: this.nowUserInfo.id, heart: "heart_on"}),
        commentid: this.props.data.id
      };
      addCommentHeart(data, (res) => {
        // console.log(res);
      });
    }
    else {
      this.setState({heartClass: "", heartsCnt: this.state.heartsCnt - 1});
      e.target.innerHTML = "좋아요";
      let data = {
        heartInfo: JSON.stringify({userid: this.nowUserInfo.id, heart: "heart_on"}),
        commentid: this.props.data.id
      };
      deleteCommentHeart(data, (res) => {
        // console.log(res);
      });
    }
  };

  loadCommentHeart = () => {
    getCommentHeart(this.props.data.id, (hData) => {
      // console.log(JSON.parse(hData.data[0]));
      if (hData.data[0] !== "") {
        if (Array.isArray(hData.data)) {
          this.setState({hearts: hData.data.map(v => JSON.parse(v))});
          console.log(this.state.hearts);
          this.state.hearts.forEach((v, i) => {
            if (v.userid === this.nowUserInfo.id) {
              this.setState({heartClass: v.heart});
            }
          });
        }
        else {
          this.setState({hearts: JSON.parse(hData.data)});
          console.log(this.state.hearts);
          this.state.hearts.forEach((v, i) => {
            if (v.userid === this.nowUserInfo.id) {
              this.setState({heartClass: this.state.hearts.heart});
            }
          });
        }

        this.setState({heartsCnt: this.state.hearts.length});
      }
    });
  };

  onShowEditForm = () => {
    this.setState({isEditOn: (this.state.isEditOn) ? false : true});
    this.contents.current.innerHTML = unescape(this.props.data.contents);
  };

  onDeleteCommentEvent = () => {
    console.log(this.props.data.id);
    deleteComment(this.props.data.id, res => {
      this.props.onUpdateComment(this.props.data.id, null);
    });
  };

  componentDidMount() {
    this.contents.current.innerHTML = unescape(this.props.data.contents);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state && this.state.hearts !== prevState.state.hearts) {
      this.loadCommentHeart();
    }
  }

  render() {
    //if (this.state.posterInfo === null) return (<div/>);

    let data = Object.assign({}, this.props.data);
    let storyUserData = getStoryUserData(data.userid) || {};
    Object.assign(data, {name: storyUserData.name, profileimg: storyUserData.img});
    const {heartClass} = this.state;
    const dateT = fn_dateTimeToFormatted(data.created);
    // const {posterInfo} = this.state;
    // console.log(data);
    if (this.contents.current) {
      this.contents.current.innerHTML = unescape(this.props.data.contents);
    }
    return (
      <li className="commentItem">
        <div className="flexClass">
          {
            (data.profileimg) ? (
              <div className="img_profile comment_user_img" style={{backgroundImage: `url(${data.profileimg})`}}
                   onClick={(e) => {
                     e.preventDefault();
                     this.props.history.push(`/story/${data.userid}/main`);
                   }}/>
            ) : (
              <div className="img_profile comment_user_normal_img" onClick={(e) => {
                e.preventDefault();
                this.props.history.push(`/story/${data.userid}/main`);
              }}/>
            )
          }

          {
            (!this.state.isEditOn) ?
              (
                <>
                  <div className="comment_name">{data.name}</div>
                  <div className="comment_time" data-placement="top"
                       title={String(data.created)}>{dateT.formatted}</div>
                  <span className="ico_ks ico_dot"/>
                  <span className={`ico_ks ico_love ${heartClass}`}>좋아요</span>
                  <div className={`comment_heartNum ${heartClass}`}>{this.state.heartsCnt}</div>

                  <span className="ico_ks ico_dot"/>
                  <div className="btn_like" onClick={this.commentHeartEvent}>
                    {
                      (heartClass.length < 2) ? "좋아요" : "좋아요 취소"
                    }
                  </div>
                </>
              ) : null
          }


          {
            (data.userid === this.nowUserInfo.id) ?
              (!this.state.isEditOn) ?
                (
                  <div className="cmt_setup">
                    <span className="ico_ks2 bn_edit" uk-tooltip="수정" onClick={this.onShowEditForm}/>
                    <span className="ico_ks2 bn_del" uk-tooltip="삭제" onClick={this.onDeleteCommentEvent}/>
                  </div>
                ) :
                (<CommentWriting postid={this.props.postid} onUpdateComment={this.props.onUpdateComment}
                                 type="edit" onShowEditForm={this.onShowEditForm} commentData={data}/>)
              : (<span className="ico_ks bn_report" uk-tooltip="신고하기"/>)
          }
        </div>

        <p className="comment_text" ref={this.contents} style={(!this.state.isEditOn) ? null : {display: "none"}}/>
        <div className="emoticon">
          {
            (data.emoticon && data.emoticon.length >= 3 && !this.state.isEditOn) ?
              (<img src={data.emoticon} className="comment_emoti"/>) : null
          }
        </div>
      </li>
    )
  }
}

export default withRouter(CommentItem);
