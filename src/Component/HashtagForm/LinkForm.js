import * as React from 'react';
import "./HashtagForm.css";

export class LinkForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // isHashLayerOn: false
    };
    this.input = React.createRef();
  }

  hashtagInputEvent = (e) => {

  };

  render() {
    return (
      <div className="hashtagForm">
        <div className="hashtagInputWrap">
          <input onInput={this.hashtagInputEvent} ref={this.props.refName} className="hashtagInput" contentEditable="true" placeholder="링크" maxLength="500"/>
        </div>
        {/*<div className="hash_layer" style={(this.state.isHashLayerOn) ? {display: "block"} : null}>*/}
        {/*  <div className="box_hash _hashTitle">*/}
        {/*    <div className="hash_box"><p className="hash_info">문득, 어디론가 떠나고 싶다면? #스토리와떠나요</p></div>*/}
        {/*  </div>*/}
        {/*  <ul className="hashtag_list">*/}
        {/*    /!*<li>#dfasdf</li>*!/*/}
        {/*    /!*<li>#dfasdf</li>*!/*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
    );
  };
};