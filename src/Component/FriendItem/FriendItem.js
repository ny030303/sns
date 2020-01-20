import React from 'react';
import './FriendItem.css';

class FriendItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <li className="friendItem">
                <span className="frame_type3 frame_g img_profile"/>
                <span className="thumb_name">Name</span>
                    {
                        (this.props.listName === "friendsList") ?
                            (<div className="friendItemIconWrap">
                                <span className="ico_ks ico_message">쪽지 보내기</span>
                                <span className="ico_ks ico_add">관심친구 해제</span>
                            </div>) :
                            (<div className="friendItemIconWrap" style={(this.props.listName === "requestList") ? {display:"flex"} : {}}>
                                <span className="ico_ks btn_defy">무시</span>
                                <span className="ico_ks btn_accept">수락</span>
                            </div>)
                    }

            </li>
        )
    }
}

export default FriendItem;
