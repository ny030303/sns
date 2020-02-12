import * as React from 'react';
import "./ModalStoryItem.css";

export class ModalStoryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className="modalStoryItem" >
        <div className="modalStoryItem_back" onClick={this.props.showStoryItem}/>
        <span className="ico_ks btn_feed_close" onClick={this.props.showStoryItem}>
          <button type="button" className="_btnClose" data-kant-id="667"
                  data-kant-group="dtl"><span>닫기</span></button>
        </span>
      </div>
    );
  };
};