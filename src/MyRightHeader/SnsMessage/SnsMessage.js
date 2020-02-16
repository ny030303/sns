import * as React from 'react';
import "./SnsMessage.css";
import MessageItem from "../NoteItem/MessageItem";
import {getSnsMessage} from "../../services/DataService";
import eventService from "../../services/EventService";

export default class SnsMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  updateSnsMessage = (uid) => {
    getSnsMessage(uid, (res) => {
      console.log(res);
      this.setState({messages: res.msg});
    });
  };

  componentDidMount() {
    this.updateSnsMessage(this.props.userInfo.id);
    eventService.listenEvent("updateUserInfoAll", () => {
      console.log("-------------------updateUserInfoAll-----------------------");
      this.setState({messages: this.state.messages});
    });
    eventService.listenEvent("updateSendMessage", (updateMessage) => {
      this.updateSnsMessage(this.props.userInfo.id);
    });
  }

  render() {
    const {showMessageWriting} = this.props;
    console.log(this.state.messages);
    return (
      <div className="btn_message">
        <div className="grayColorBtn" onClick={showMessageWriting}>새 쪽지 작성</div>
        <div className="friends_list_wrap"
             style={{overflow: "hidden", height: "626px", width: "100%", overflowY: "scroll"}}>
          <ul className="friends_list" style={{height: "100%", margin: "0"}}>
            {/*friendItem 정보 넣기*/}
            {
              this.state.messages.map((v, i) => (
                <MessageItem key={i} data={v} userid={this.props.userInfo.id} showMessageWriting={showMessageWriting}/>
              ))
            }
          </ul>
        </div>
      </div>
    );
  };
};