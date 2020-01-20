import React from 'react';
import './CommentItem.css';

class CommentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <li className="commentItem">
                <div className="flexClass">
                    <div className="img_profile comment_user_img"/>
                    <div className="comment_name">정나영</div>
                    <div className="comment_time">2시간 전</div>
                    <span className="ico_ks ico_dot"/>
                    <span className="ico_ks ico_love">좋아요</span>
                    <div className="comment_heartNum">1</div>
                    <span className="ico_ks ico_dot"/>
                    <div className="btn_like">좋아요</div>
                </div>

                <p className="comment_text">와하하하!</p>
                <div className="emoticon">
                    <img src="/images/thum/thum_001.png" className="comment_emoti"/>
                </div>
            </li>
        )
    }
}

export default CommentItem;
