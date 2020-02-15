import * as React from 'react';
import "./SnsMessage.css";
import MessageItem from "../NoteItem/MessageItem";
import {getSnsMessage} from "../../services/DataService";

export default class SnsMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }


  componentDidMount() {
    getSnsMessage(this.props.userInfo.id, (res) => {
      console.log(res);
      this.setState({messages: res.msg});
    })
  }

  render() {
    const {showMessageWriting} = this.props;
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