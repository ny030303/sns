import * as React from 'react';
import "./MessageWriting.css";

export class MessageWriting extends React.Component {
  render() {
    return (
      <div className="messageWriting">
        <div className="messageWriting_dark" onClick={this.props.showMessageWriting}/>
        <div className="box_writing">
          <div className="tit_message">새쪽지 작성</div>
          <div className="link_close" onClick={this.props.showMessageWriting}>
            <span className="ico_ks ico_close">취소</span>
          </div>
          <div className="friends_search">
            <input className="tf_from" placeholder="받는사람" maxLength="100"/>
          </div>
          <div className="box_write">
            <textarea className="tf_write" maxLength="80"/>
          </div>
          <div className="menu_media">

          </div>
          <div className="bn_group">
            <div className="btn_com">보내기</div>
          </div>
        </div>
      </div>
    );
  };
}