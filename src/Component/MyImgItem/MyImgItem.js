import * as React from 'react';
import "./MyImgItem.css";

export class MyImgItem extends React.Component {
  render() {
    const {data, type} = this.props;
    return (
      <div className={`myImgItem ${(type === "txt") ? "txt_item" : ""}`}
           style={(type !== "txt") ? {backgroundImage: `url("/images/bg23.jpg")`} : null}
            onClick={this.props.onClickEvent}>
        {
          (type === "txt") ?
            (<div className="link_txt">
              <span className="txt_info">asdfasdf</span>
              <span className="txt_date">2020.02.12</span>
            </div>) :
            (<div className="link_thumb">

            </div>)
        }
        <div className="myImgItem_hover">
          <div className="myImgItem_dark"/>
          <span className="cont_empathy">
            <span className="txt_empathy">
              <span className="ico_ks ico_imagefeel">느낌</span>0
            </span>
            <span className="txt_empathy">
              <span className="ico_ks ico_imagecmt">댓글</span>0
            </span>
          </span>
        </div>
      </div>
    );
  };
}