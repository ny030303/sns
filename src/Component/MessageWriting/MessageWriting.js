import * as React from 'react';
import "./MessageWriting.css";
import {addSnsMessage, getFriends} from "../../services/DataService";
import alertDialog from "../../services/AlertDialog";
import eventService from "../../services/EventService";

export class MessageWriting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      targets: [],

    };
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.messageBox = React.createRef();
  }

  componentDidMount() {
    getFriends(this.userInfo.id, 100, res => {
      this.setState({targets: res.friends});

    });
  }

  // nameInputEvent = (e) => {
  //
  // };

  onToogleTargetCheck = (id) => {
    let target = this.state.targets.find(v => v.id === id)
    target.checked = target.checked ? false : true;
    this.setState({targets: this.state.targets});
  };

  sendMessageToFriends = () => {
    alertDialog.show("안내", "메시지를 전송했습니다.");
    let ids = this.state.targets.filter(fv => fv.checked).map(mv => mv.id);
    let data = {
      toIds: ids.join(','),
      fromid: this.userInfo.id,
      message: this.messageBox.current.value
    };

    addSnsMessage(data, res => {
      // console.log(res);
    });
    eventService.emitEvent("updateSendMessage", data);
    this.props.closeMessageWriting();
  };

  render() {
    // console.log(this.props.data);
    return (
      <div className="messageWriting">
        <div className="messageWriting_dark" onClick={this.props.closeMessageWriting}/>
        <div className="box_writing">
          <div className="tit_message">새쪽지 작성</div>
          <div className="link_add">

          </div>
          <div className="link_close" onClick={this.props.closeMessageWriting}>
            <span className="ico_ks ico_close">취소</span>
          </div>
          <div className="friends_search">
            <div>
              {
                this.state.targets.filter(fv => fv.checked).map(mv => mv.name).join(', ')
              }
            </div>
            <div className="uk-inline triangleDown">
              <span type="button">▼</span>
              <div uk-dropdown="mode: click; pos: bottom-right">
                <ul className="uk-list uk-list-striped">
                  {
                    this.state.targets.map((v,i) => (
                      <li key={i} onClick={() => this.onToogleTargetCheck(v.id)}>
                        {v.name}&nbsp;{v.checked ? 'V' : ''}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>

            {/*<input className="tf_from" placeholder="받는사람" maxLength="100" onChange={this.nameInputEvent} onInput={this.nameInputEvent}/>*/}
          </div>
          <div className="box_write">
            <textarea className="tf_write" maxLength="80" ref={this.messageBox}/>
          </div>
          <div className="menu_media">

          </div>
          <div className="bn_group">
            <div className="btn_com" onClick={this.sendMessageToFriends}>{this.props.data ? "답장" : "보내기"}</div>
          </div>
        </div>
      </div>
    );
  };
}