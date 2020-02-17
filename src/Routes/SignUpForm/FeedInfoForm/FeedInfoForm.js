import * as React from 'react';
import "./FeedInfoForm.css";
import {CheckTag} from "../../../Component/CheckTag/CheckTag";
import alertDialog from "../../../services/AlertDialog";
import {putUser, updateUserProfileImg} from "../../../services/DataService";
import {withRouter} from "react-router-dom";
import {fileToDataURL} from "../../../services/CommonUtils";

class FeedInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            idCheckText: "",
            pwd: "",
            pwdCheckText: "",
            name: "",
            nameCheckText: "",
            birth: null,
            gender: 0,
            profileimg: null
        };

        this.rePwd = React.createRef();
    }

    componentDidMount() {

    }

    IsValidText(nowText) {
        // console.log(nowText);
        let tests = nowText;
        let regEx1 = /^[0-9]*$/;
        let regEx2 = /^[0-9a-zA-Z]*$/;
        let regEx3 = /^[!@#$%^&*()]*$/;
        let regEx4 = /^[ㄱ-ㅎ|ㅏ-ㅣ가-힣]*$/;
        if (regEx1.test(tests) === true || regEx2.test(tests)=== true  || regEx3.test(tests) === true  || regEx4.test(tests)=== true ) {

            // console.log("굳");
            // console.log(regEx1.test(tests), regEx2.test(tests), regEx3.test(tests), regEx4.test(tests));
            return true;
        }
        else {

            // console.log("ㄴㄴ");
            // console.log(regEx1.test(tests), regEx2.test(tests), regEx3.test(tests), regEx4.test(tests));
            return false;
        }
    }

    selectGender = (e) => {
        let num = e.target.dataset.gnum;
        this.setState({gender: Number(num)});
    };



    idEvent = (e) => {
        // this.setState({id: e.target.value})
        if(this.IsValidText(e.target.value, this.state.idCheckText) === false) {
            this.setState({idCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
        } else if(this.IsValidText(e.target.value) === true) {
            this.setState({idCheckText:""});
            this.setState({id: e.target.value.trim()});
        }
    };
    pwdEvent = (e) => {
        // this.setState({pwd: e.target.value})
        if(this.IsValidText(e.target.value, this.state.pwdCheckText) === false) {
            this.setState({pwdCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
        } else if(this.IsValidText(e.target.value) === true) {
            this.setState({pwdCheckText:""});
            this.setState({pwd: e.target.value.trim()});
        }
    };
    nameEvent = (e) => {
        // this.setState({name: e.target.value})
        if(this.IsValidText(e.target.value, this.state.nameCheckText) === false) {
            this.setState({nameCheckText:"알파벳, 한글, 숫자, 띄어쓰기, 특수문자('!@#$%^&*()')로만 구성하여야 합니다."});
        } else if(this.IsValidText(e.target.value) === true) {
            this.setState({nameCheckText:""});
            this.setState({name: e.target.value.trim()});
        }
    };
    birthEvent = (e) => {
        this.setState({birth: e.target.value.trim()})
    };



    signup = () => {
        const {state} = this;
        // console.log(this.state.profileimg);
        if (state.idCheckText.length > 0 || state.pwdCheckText.length > 0 || state.nameCheckText.length > 0) {
            alertDialog.show("회원가입 실패", "맞지 않는 값이 들어있습니다.");
        } else if (state.id === "" || state.pwd === "" || state.name === "") {
            alertDialog.show("회원가입 실패", "값을 확인 해주시기 바랍니다.");
        } else if(state.profileimg === null) {
            alertDialog.show("회원가입 실패", "프로필 사진은 비울 수 없습니다.");
        } else if (state.pwd !== this.rePwd.current.value) {
            alertDialog.show("회원가입 실패", "비밀번호를 확인 해주시기 바랍니다.");
        } else {
            putUser({
                id: state.id,
                pwd: state.pwd,
                name: state.name,
                birth: state.birth,
                gender: state.gender,
                profileimg: state.profileimg,
                memo: null,
                basekeyword: null,
                allow_search: 1, allow_getnews: 0, allow_reqfriends: 1,
                allow_message: 1, allow_friendslist: 1, allow_position: 0,
                blocklist: null,
            }, (data) => {
                // console.log(data);
                if (Number(data.result) === 1) {
                    alertDialog.show("회원가입 성공!", "정상적으로 회원가입 됐습니다.");
                    this.props.history.push("/login");

                } else {
                    alertDialog.show("회원가입 실패!", "회원가입에 실패 했습니다.");
                }

            });
        }
    };

    changeUserProfileImg = (e) => {
        // this.showBgMenu();
        fileToDataURL(e.target.files[0]).then(res => {
            let canvas = document.createElement("canvas");
            canvas.setAttribute("width", 128);
            canvas.setAttribute("height", 128);
            let ctx = canvas.getContext("2d");
            let img = new Image();
            img.onload = () => {
                let rtSrc = {x: 0, y: 0, w: img.width, h: img.height};
                if (img.width > img.height) {
                    rtSrc.w = img.height;
                    rtSrc.x = 0;
                } else {
                    rtSrc.h = img.width;
                    rtSrc.y = 0;
                }
                // console.log(rtSrc);
                ctx.drawImage(img, rtSrc.x, rtSrc.y, rtSrc.w, rtSrc.h, 0, 0, 128, 128);
                // updateUserProfileImg({
                //     userid: JSON.parse(localStorage.getItem("userInfo")).id,
                //     img: canvas.toDataURL()
                // }, () => {
                //     this.loadUserInfo();
                // });
                this.setState({profileimg: canvas.toDataURL()});
            };
            img.src = res;
        });
    };

    render() {
        const {gender, profileimg, idCheckText, pwdCheckText, nameCheckText} = this.state;
        return (
            <div className="signupArticle">
                <h2 className="tit_step">계정 정보를 입력해주세요.</h2>
                {/*<div className="link_pf userProfileImg" style={{backgroundImage: `url(${posterInfo.profileimg})`}}/>) :*/}
                <div className="signupChangeProfileWrap">
                    {
                        (profileimg === null) ? (<div className="link_pf bg_pf"/>)
                            : (<div className="link_pf userProfileImg" style={{backgroundImage: `url(${profileimg})`}}/>)

                    }
                    {
                        // (this.nowUserInfo.id === this.props.match.params.userId) ?
                        (<div className="filebox">
                            <label htmlFor="story_img_file" className="ico_ks ico_pf"/>
                            <input type="file" accept="image/*" id="story_img_file" onChange={this.changeUserProfileImg}/>
                        </div>)
                    }
                </div>

                <div className="tf_required">계정 아이디</div>
                <input type="text" className="tf_g_feedInfo" placeholder="아이디 입력 (ex. asdf1234 ...)" maxLength="100"
                       onChange={this.idEvent} onInput={this.idEvent}/>
                <p className="checkText">{idCheckText}</p>
                <div className="tf_required">비밀번호</div>
                <input type="password" className="tf_g_feedInfo" placeholder="비밀번호" maxLength="100"
                       onChange={this.pwdEvent} onInput={this.pwdEvent}/>
                <p className="checkText">{pwdCheckText}</p>
                <input type="password" className="tf_g_feedInfo" placeholder="비밀번호 재입력" ref={this.rePwd}/>

                <div className="tf_required">닉네임</div>
                <input type="text" className="tf_g_feedInfo" placeholder="닉네임을 입력해주세요." maxLength="200"
                       onChange={this.nameEvent} onInput={this.nameEvent}/>
                <p className="checkText">{nameCheckText}</p>
                <div className="tf_required">생일[선택]/성별</div>
                <input type="text" className="tf_g_feedInfo" placeholder="(ex. 20030101)" maxLength="8"
                       onChange={this.birthEvent} onInput={this.birthEvent}/>
                <div style={{margin: "10px 0"}}>
                    <label className={`lab_g ${(gender === 0) ? "item_on" : null}`}
                           style={{display: "inline-block", marginRight: "10px"}}>
                        <span className="ico_account ico_signup_check" onClick={this.selectGender} data-gnum="0"/>
                        <span className="txt_check">남성</span>
                    </label>
                    <label className={`lab_g ${(gender === 1) ? "item_on" : null}`} style={{display: "inline-block"}}>
                        <span className="ico_account ico_signup_check" onClick={this.selectGender} data-gnum="1"/>
                        <span className="txt_check">여성</span>
                    </label>
                </div>
                <br/>
                <br/>
                <button className="btn_g btn_confirm" onClick={this.signup}>동의</button>
            </div>
        );
    };
};

export default withRouter(FeedInfoForm);