import * as React from 'react';
import "./HashtagForm.css";

export class HashtagForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHashLayerOn: false
    };
    // this.input = React.createRef();
  }

  hashtagInputEvent = (e) => {
    let lastText = e.target.innerHTML.substr(-1,1);

    if(lastText === "#") {
      let regex = new RegExp("#[\\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*", "gm");
      let content = e.target.innerHTML;
      content = content.replace(regex, `<span class="hashtag_color">$&</span>`);
      e.target.innerHTML = content;
      this.setState({isHashLayerOn: true});
    } else if(lastText === " " || e.target.innerHTML.length <= 0) {
      this.setState({isHashLayerOn: false});
    }
  };

  render() {
    return (
      <div className="hashtagForm">
        <div className="hashtagInputWrap">
          <div onInput={this.hashtagInputEvent}  className="hashtagInput" contentEditable="true" placeholder="해시태그"/>
        </div>
        <div className="hash_layer" style={(this.state.isHashLayerOn) ? {display: "block"} : null}>
          <div className="box_hash _hashTitle">
            <div className="hash_box"><p className="hash_info">문득, 어디론가 떠나고 싶다면? #스토리와떠나요</p></div>
          </div>
          <ul className="hashtag_list">
            {/*<li>#dfasdf</li>*/}
            {/*<li>#dfasdf</li>*/}
          </ul>
        </div>
      </div>
    );
  };
};