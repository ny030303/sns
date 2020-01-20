import React from 'react';
import './MessageItem.css';

class MessageItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className="massageItem">
                <div className="link_message">
                    <div className="thumb_user">
                        <span className="img_profile frame_g frame_type2"/>
                        <span className="ico_ks ico_in">받은쪽지</span>
                    </div>

                    <div className="desc_message">
                        <span className="user_name" style={{fontWeight:"bold"}}>Name</span>
                        <span className="ico_ks ico_newmessage"
                              style={{display: "none"}}>새로운 쪽지</span>
                        <div className="txt_message">뭐라뭐라 내용</div>
                    </div>
                    <span className="txt_date">2017년 2월 28일</span>
                </div>
            </li>
        )
    }
}

export default MessageItem;
