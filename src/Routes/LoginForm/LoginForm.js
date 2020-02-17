import React from 'react';
import './LoginForm.css';
import eventService from "../../services/EventService";
import {getUser} from "../../services/DataService";
import alertDialog from "../../services/AlertDialog";
import {CheckTag} from "../../Component/CheckTag/CheckTag";

const loadImg = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(null);
        img.src = url;
    });
};


const createImgDataUrl = async (url) => {
    let img = await loadImg(url);
    if (img !== null) {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", img.width);
        canvas.setAttribute("height", img.height);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL();
    }
    return null;
};

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowBgPage: 0,
            imgDataUrl: `/images/login/image1.jpg`,
            userId: "",
            userPwd: "",
            isAgree: false
        };
        this.count = null;
    }

    componentDidMount() {
        if (window.userInfo !== undefined) this.props.history.push("/");
        eventService.listenEvent("appLogined", logined => {
            if (logined) this.props.history.push("/");
        });

        eventService.emitEvent("topMenuHide", true);
        this.count = setInterval(() => {
            //let page = ;
            let nextImage = (this.state.nowBgPage + 1) % 4;
            // console.log(nextImage);
            createImgDataUrl(`/images/login/image${nextImage + 1}.jpg`).then(imgdataurl => {
                // console.log(imgdataurl)
                this.setState({nowBgPage: nextImage, imgDataUrl: imgdataurl});
            })

            //if(this.state.nowBgPage > 3) this.setState({nowBgPage:0});
            // console.log(this.state.nowBgPage);
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.count);
        this.setState({imgDataUrl: null});
        eventService.emitEvent("topMenuHide", false);
    }

    gotoSignup = () => {
        this.props.history.push("/signup")
    };


    changeId = (e) => this.setState({userId: e.target.value});
    changePwd = (e) => this.setState({userPwd: e.target.value});

    login = () => {
        if (this.state.userId === "" || this.state.userPwd === "") {
            alertDialog.show("알림!", "값을 확인해 주시기 바랍니다.");
            return;
        }

        getUser(this.state.userId, this.state.userPwd, (data) => {
            console.log("login getuser: ", data);
            if (data.result) {

                localStorage.setItem("userInfo", JSON.stringify(data.user));
                if (!this.state.isAgree) {
                    // localStorage.setItem("isSaveUserInfo", true);
                    localStorage.setItem("isSaveUserInfo", false);
                }
                eventService.emitEvent("loginStatus", true);
                alertDialog.show("로그인", `반갑습니다 ${data.user.name}님`);
                this.props.history.push("/");

            } else {
                alertDialog.show("로그인 오류!", "로그인에 실패했습니다.");
            }

        });
    };

    onCheckChange = () => {
        this.setState({isAgree: !this.state.isAgree})
    };

    render() {
        let mainMsgs = ["msg01.png", "msg02.png", "msg03.png"];
        return (
            <div className="loginForm" style={{backgroundImage: `url('${this.state.imgDataUrl}')`}}>
                <div className="kakaoHead">
                    <img id="loginLogo" height="30" className="img_logo" alt="kakao"
                         src="/images/login/logo.png"/>
                </div>
                <div id="mArticle">
                    <strong className="tit_intro">
                        <img id="message"
                             src={`/images/login/${mainMsgs[(this.state.nowBgPage >= 3) ? 2 : this.state.nowBgPage]}`}
                             height="93" className="img_intro"/>
                    </strong>
                    <div className="login_input_wrap">
                        <input type="text" className="tf_g" placeholder="카카오계정 (이메일 또는 전화번호)" onChange={this.changeId}/>
                        {/*<span className="ico_help ico_account"*/}
                        {/*      uk-tooltip="title: 넌 평소 로그아웃을 소중히 여기지 않았지... 그 댓가를 치루게 될거야.; pos: bottom-right"/>*/}
                        <span className="ico_help ico_account"
                              uk-tooltip="title: 카카오계정은 카카오 서비스 및 연계 서비스를 이용하기 위하여 필요한 로그인 계정입니다.; pos: bottom-right"/>
                        <input type="password" className="tf_g" placeholder="비밀번호" onChange={this.changePwd}/>
                    </div>
                    <div className="set_login">
                        <CheckTag type="login" text="로그인 상태 유지" agree={this.state.isAgree} agreeNum={0}
                                  onCheckChange={this.onCheckChange}/>
                    </div>

                    <div className="wrap_btn">
                        <button className="btn_g btn_comfirm" onClick={this.login}>로그인</button>
                    </div>
                    <div className="login_signUp_btn_wrap">
                        <div>Don't have an account? <span onClick={this.gotoSignup}>Sign up</span></div>
                    </div>
                </div>
                <div className="login_footer">
                    <ul>
                        <li>이용약관</li>
                        <li>개인정보</li>
                        <li>처리방침</li>
                        <li>운영정책</li>
                        <li>고객센터</li>
                        <li>공지사항</li>
                        <li>한국어</li>
                    </ul>
                    <div className="txt_copyright">Copyright © Kakao Corp. All rights reserved.</div>
                </div>
            </div>
        )
    }
}

export default LoginForm;
