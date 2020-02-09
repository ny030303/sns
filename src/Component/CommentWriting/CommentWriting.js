import * as React from 'react';
import "./CommentWriting.css";
import {MyEmotions} from "../MyEmotions/MyEmotions";
import {MyEmojis} from "../MyEmojis/MyEmojis";
import {addComment, updateComment} from "../../services/DataService";

const replaceAll = (str, target, replacement) => {
  return str.split(target).join(replacement);
};

const htmlchar_run = (str) => {
  let  tmp=replaceAll(str,'\t',"&nbsp;&nbsp;&nbsp;&nbsp;");
  tmp=replaceAll(tmp," ","&nbsp;");
  tmp=replaceAll(tmp,'\n',"<br/>");
  tmp= "<div>"+tmp+"</div>";
  return tmp;

};


export class CommentWriting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postContents: "",
      emoticon: null,
      isEmotionFade: false,
      isEmojiFade: false,
    };

    this.input = React.createRef();
  }


  addCommentEvent = () => {
    console.log(this.props.postid);
    let data = {
      postid: this.props.postid,
      userid: JSON.parse(localStorage.getItem("userInfo")).id,
      contents: escape(htmlchar_run(this.state.postContents)),
      emoticon: (this.state.emoticon == null) ? null : this.state.emoticon,
    };

    addComment(data, (res) => {
      console.log(res);
      if(res.result === 1) {
        this.props.onAddComment(res.data);
        this.input.current.innerHTML = "";
        this.setState({postContents: this.input.current.innerHTML, emoticon: null});
      }
    });
  };

  editCommentEvent = () => {
    let data = {
      commentid: this.props.commentData.id,
      contents: escape(htmlchar_run(this.state.postContents)),
      emoticon: (this.state.emoticon == null) ? null : this.state.emoticon,
    };

    updateComment(data, (res) => {
      let comment = this.props.commentData;
      Object.assign(comment, {contents: data.contents, emoticon: data.emoticon});
      this.props.onUpdateComment(comment.id, comment);
      this.props.onShowEditForm();
    });
  };

  onCommentBtnClick = () => {
    if(this.props.type === "edit") {
      this.editCommentEvent();
    } else {
      this.addCommentEvent();
    }
  };

  componentDidMount() {
    if(this.props.type === "edit") {
      const {commentData} = this.props;
      console.log(commentData);

      this.input.current.innerHTML =  unescape(commentData.contents);
      this.setState({postContents: this.input.current.innerHTML,
        emoticon: (commentData.emoticon !== "") ? commentData.emoticon : null});
      // this.props.commentData
    }
  }

  showEmoji = () => (this.state.isEmojiFade) ? this.setState({isEmojiFade: false}) : this.setState({isEmojiFade: true});
  showEmotion = () => (this.state.isEmotionFade) ? this.setState({isEmotionFade: false}) : this.setState({isEmotionFade: true});

  writeEvent = (e) => {
    if (this.state.isPostOn === false) this.setState({isPostOn: true});
    this.setState({postContents: e.target.innerHTML});
  };

  addEmoji = (e) => {
    this.input.current.innerHTML =  this.input.current.innerHTML + e.target.innerHTML;
    this.setState({postContents: this.input.current.innerHTML});
  };

  addEmotion = (e) => {
    let imgsrc = String(e.target.src);
    let imglink = imgsrc.substring(imgsrc.length, 21);
    // console.log();
    this.setState({emoticon: imglink});
    // console.log(this.state.postContents);
  };

  render() {
    const {isEmotionFade, isEmojiFade, emoticon} = this.state;
    const {postid, data, onloadComments, type} = this.props;
    return (
      <div className="relative">
        <div className={`inp_write_wrap ${(type !== undefined && type === "edit") ? "editCommentStyle" : null}`}>
          <div id="contents_write" className="inp_write" contentEditable="true"
               onChange={this.writeEvent} onInput={this.writeEvent}
               placeholder="댓글을 입력하세요." ref={this.input} />
          {
            (this.state.emoticon == null) ? null :
              (<div className="relative">
                <img src={this.state.emoticon} className="emoticonStyle" alt="emotion"/>
                <p className="ico_ks bn_x6" onClick={() => this.setState({emoticon: null})}/>
              </div>)
          }

          <div className="ico_ks bn_photo"/>
          <div className="bn_emoji" onClick={this.showEmoji}>🙂</div>
          <div className="ico_ks2 bn_emoti" onClick={this.showEmotion}/>

        </div>
        {(isEmotionFade) ? <MyEmotions addEmotion={this.addEmotion}/> : null}
        {(isEmojiFade) ? <MyEmojis addEmoji={this.addEmoji}/> : null}
        <button className="btn orangeColorBtn nullTextOrangeColor"
                style={(this.state.postContents.length > 0) ?
                  {display: "none"} :  (type === "edit") ?
                    {position: "absolute", top: "0", right: "-76px"} : {display: "inline-block"} }>전송
        </button>
        <button className="btn orangeColorBtn"
                onClick={this.onCommentBtnClick}
                style={(this.state.postContents.length > 0) ?
                  (type === "edit") ?
                    {position: "absolute", top: "0", right: "-76px"} :
                    {display: "inline-block"} :
                  {display: "none"}}>전송
        </button>
        {
          (type === "edit") ?
            (<button className="blackLineBtn" style={{position: "absolute", top: "37px",
              right: "-76px"}} onClick={this.props.onShowEditForm}>취소</button>) : null
        }
      </div>
    );
  };
};