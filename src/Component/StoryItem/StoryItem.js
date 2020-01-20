import React from 'react';
import './StoryItem.css';
import CommentItem from "./CommentItem/CommentItem";

class StoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPostOn: false,
            postContents: "",
            feelIconClass: "",
            isCheckFeel: null
        };
        this.feelIcons = [
            "bn_feel",
            "bn_like",
            "bn_pleasure",
            "bn_sad",
            "bn_cheerup",
            "bn_good",
        ];
    }

    feelIconEvent = (e) => {
        let fnum = e.target.dataset.fnum;
        // let nowFeelIcon = document.querySelector("#nowFeelIcon");
        // console.log(fnum);
        // nowFeelIcon.classList.remove("bn_like", "bn_pleasure", "bn_sad", "bn_cheerup", "bn_good");
        // nowFeelIcon.classList.add(this.state.feelIcons[Number(fnum)]);
        // this.state.feelIconClass = this.feelIcons[fnum];
        this.setState({feelIconClass: this.feelIcons[fnum]});
    };

    nowFeelIconEvent = () => {
        // let nowFeelIcon = document.querySelector("#nowFeelIcon");
        // if(this.state.isCheckFeel !== null) {
        //     nowFeelIcon.classList.remove("bn_like", "bn_pleasure", "bn_sad", "bn_cheerup", "bn_good");
        //     this.setState({isCheckFeel: null});
        // } else {
        //     nowFeelIcon.classList.add(this.state.feelIcons[0]);
        //     this.setState({isCheckFeel: 0});
        // }

        this.setState({feelIconClass: this.state.feelIconClass == "" ? "bn_like" : ""});
    };

    writeEvent = (e) => {
        if (this.state.isPostOn === false) this.setState({isPostOn: true});
        this.setState({postContents: e.target.innerText});
        // console.log(e.target.innerText);
    };

    render() {
        return (
            <div className="StoryItem section">
                <div className="storyContentsWrap">
                    <span className="img_profile frame_g frame_type6">
                        <span className="img_profile line"/>
                    </span>
                    <div className="btn_top_group">
                        <span className="ico_ks btn_save"/>
                        <span className="ico_ks bn_modify"/>
                    </div>
                    <div className="add_top">
                        <div style={{paddingBottom: "2px"}} className="pf_name">이름</div>
                        <div className="storyitem_font_style">1월 13일 오전 11:00</div>
                    </div>

                    <br/><br/><br/>
                    <div>sdfsdfsdfsdfsdfsdf</div>
                    <div>sdfsdfsdfsdfsdfsdf</div>
                    <div className="storyitem_font_style" style={{cursor:"pointer"}}>...더보기</div>
                    <br/>
                    <div className="storyitem_icon_wrap">
                        <div onClick={this.nowFeelIconEvent} className={`ico_ks2 bn_feel ${this.state.feelIconClass}`} id="nowFeelIcon"/>
                        {
                            this.state.feelIconClass !== "" ? null : (
                              <div className="selectFeelIcons">
                                <div onClick={this.feelIconEvent} className="ico_ks2 bn_like selectFeelIconStyle" data-fnum="1"/>
                                <div onClick={this.feelIconEvent} className="ico_ks2 bn_pleasure selectFeelIconStyle" data-fnum="2"/>
                                <div onClick={this.feelIconEvent} className="ico_ks2 bn_sad selectFeelIconStyle" data-fnum="3"/>
                                <div onClick={this.feelIconEvent} className="ico_ks2 bn_cheerup selectFeelIconStyle" data-fnum="4"/>
                                <div onClick={this.feelIconEvent} className="ico_ks2 bn_good selectFeelIconStyle" data-fnum="5"/>
                              </div>
                            )
                        }

                        <div className="ico_ks2 bn_share"/>
                        <div className="ico_ks2 bn_up"/>
                    </div>
                </div>
                <div className="storyCommentsWrap">
                    <div className="count_group">
                        <p>느낌 <span>1443</span></p>
                        <p>댓글 <span>300</span></p>
                        <p>공유 <span>37</span></p>
                        <p>UP <span>50</span></p>
                    </div>
                    <div style={{position: "relative"}}>
                        <div id="contents_write" className="inp_write" contentEditable="true" onChange={this.writeEvent}
                             onInput={this.writeEvent}
                             placeholder="댓글을 입력하세요."/>
                        <div className="ico_ks2 bn_emoti"/>
                        <button className="btn orangeColorBtn nullTextOrangeColor"
                                style={(this.state.postContents.length > 0) ? {display: "none"} : {display: "inline-block"}}>전송</button>
                        <button className="btn orangeColorBtn"
                                style={(this.state.postContents.length > 0) ? {display: "inline-block"} : {display: "none"}}>전송</button>
                    </div>

                    <ul className="storyCommentsList">
                        <CommentItem/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default StoryItem;
