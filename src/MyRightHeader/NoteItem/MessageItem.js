import React from 'react';
import './MessageItem.css';
import {getStoryUserData} from "../../services/DataService";

class MessageItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data,userid} = this.props;
        // id: "1"
        // myid: "asdf"
        // fromid: "admin"
        // message: "ddddfdfdfdfdffd"
        // created: "2020-02-15 22:36:21"
        // isread: "0"

        let msgUser = getStoryUserData((data.myid === userid) ? data.fromid : data.myid) || {};
        let userIconStyle = msgUser.img ? {
            background: `url(${msgUser.img}) no-repeat 0 0`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%"
        } : {
            background: `url("/images/profile_defult.png"}) no-repeat 0 0`,
        };
        console.log(msgUser);
        return (
            <li className="massageItem" data-msgrd="1" onClick={(e) => this.props.showMessageWriting(e, data)}>
                <div className="link_message">
                    <div className="thumb_user">
                        <span className="img_profile frame_g frame_type2" style={userIconStyle}/>
                        <span className={`ico_ks ${(data.myid === userid) ? "ico_in" : "ico_out"}`}>받은쪽지</span>
                    </div>

                    <div className="desc_message">
                        <span className="user_name" style={{fontWeight:"bold"}}>{msgUser.name}</span>
                        <span className="ico_ks ico_newmessage"
                              style={{display: "none"}}>새로운 쪽지</span>
                        <div className="txt_message">{data.message}</div>
                    </div>
                    <span className="txt_date">{new Date(data.created).toLocaleString()}</span>
                </div>
            </li>
        )
    }
}

export default MessageItem;
