import React from 'react';
import './WritingContainer.css';
import {postWriting} from "../../services/DataService";

class WritingContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postContents: "",
            isPostOn: false,
            postMsg: [
                "( )님의 이야기를 기다리고 있어요.",
                "오늘 하루, 기억하고 싶은 순간이 있나요?"
            ]
        };
        this.myPostFile = React.createRef();
        // console.log(this.myPostFile);
    }

    writeEvent = (e) => {
        if (this.state.isPostOn === false) this.setState({isPostOn: true});
        this.setState({postContents: e.target.innerText});
    };

    postOff = () => {
        this.setState({isPostOn:false});
        let contents = document.querySelector("#contents_write");
        contents.innerText = "";
    };

    postEvent = () => {
        let data = {
            // userid:JSON.parse(localStorage.getItem("userInfo")).id,
            // fileid: ,
            // feeling:,
            // contents:
        };

        postWriting(data, () => {

        });
        // this.state.postContents;
    };

    fileEvent = () => {

    };

    render() {
        let random = Math.floor(Math.random() * 2);
        console.log(random);
        return (
            <div className="writingContainer">
                <div className="write">
                    <div className="section">
                        <div id="contents_write" className="editable" contentEditable="true" onChange={this.writeEvent}
                             onInput={this.writeEvent}
                             style={(this.state.isPostOn) ? {minHeight: "130px"} : {minHeight: "37px"}}
                             placeholder={this.state.postMsg[random]}/>
                        <br/>
                        <ul className="fileUploadList">
                            <li className="link_menu">
                                <label className="txt_menu" htmlFor="ex_file">
                                    <span style={{display: "flex"}}>
                                        <span className="ico_ks ico_camera"/><span>사진/동영상</span>
                                        <input type="file" className="filebox" ref={this.myPostFile}/>
                                    </span>
                                </label>
                                <input type="file" id="ex_file"/>
                            </li>
                            <li className="link_menu">
                                <div className="txt_menu">
                                    <span style={{display: "flex"}}>
                                        <span className="ico_ks ico_music"/><span>뮤직</span>
                                    </span>
                                </div>
                            </li>
                            <li className="link_menu">
                                <div className="txt_menu">
                                    <span style={{display: "flex"}}>
                                        <span className="ico_ks ico_link"/><span>링크</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div className="bottomWriteContents" style={(this.state.isPostOn) ? {display: "block"} : {display: "none"}}>
                            <div className="dropdown">
                                <div className="inner_open" data-toggle="dropdown">
                                    <div className="flexClass">
                                        <span className="ico_ks global"/><span>전체 공개</span>
                                    </div>
                                </div>
                                <div className="dropdown-menu">
                                    <p className="dropdown-item">Link 1</p>
                                    <p className="dropdown-item">Link 2</p>
                                    <p className="dropdown-item">Link 3</p>
                                </div>
                            </div>
                            <div className="postIconWrap">

                            </div>
                            <div className="writePostBtns">
                                <button className="btn blackLineBtn" onClick={this.postOff}>취소</button>
                                <button className="btn orangeColorBtn nullTextOrangeColor"
                                        style={(this.state.postContents.length > 0) ? {display: "none"} : {display: "inline-block"}}>올리기</button>
                                <button className="btn orangeColorBtn"
                                        style={(this.state.postContents.length > 0) ? {display: "inline-block"} : {display: "none"}}
                                onClick={this.postEvent}>올리기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WritingContainer;
