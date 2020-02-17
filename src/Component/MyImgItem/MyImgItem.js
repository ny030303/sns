import * as React from 'react';
import "./MyImgItem.css";

export class MyImgItem extends React.Component {

  constructor(props) {
    super(props);
    this.contents = React.createRef();
  }

  componentDidMount() {
    if(this.props.type === "txt") {
      this.contents.current.innerHTML = unescape(this.props.postData.contents);
    }
  }

  render() {
    const {imgSrc, type, postData} = this.props;
    // console.log(this.contents.current);
    if(this.contents.current) {
      this.contents.current.innerHTML = unescape(postData.contents);
    }

    return (
      <div className={`myImgItem ${(type === "txt") ? "txt_item" : ""}`}
           style={(type !== "txt") ? {backgroundImage: `url("${imgSrc}")`} : null}
           data-postid={postData.id}
            onClick={this.props.onClickEvent}>
        {
          (type === "txt") ?
            (<div className="link_txt">
              <div className="txt_info" ref={this.contents}/>
              <span className="txt_date">2020.02.12</span>
            </div>) :
            (<div className="link_thumb">

            </div>)
        }
        <div className="myImgItem_hover">
          <div className="myImgItem_dark"/>
          <span className="cont_empathy">
            <span className="txt_empathy">
              <span className="ico_ks ico_imagefeel">느낌</span>{postData.feeling.split("|").length}
            </span>
            <span className="txt_empathy">
              <span className="ico_ks ico_imagecmt">댓글</span>{(postData.comments) ? postData.comments.length : 0}
            </span>
          </span>
        </div>
      </div>
    );
  };
}