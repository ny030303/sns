import * as React from 'react';
import "./FeedInfoForm.css";
import {CheckTag} from "../../../Component/CheckTag/CheckTag";
import alertDialog from "../../../services/AlertDialog";
import {putUser} from "../../../services/DataService";
import {withRouter} from "react-router-dom";

class FeedInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pwd: "",
      name: "",
      birth: null,
      gender: 0
    };

    this.rePwd =  React.createRef();
  }

  componentDidMount() {
  }

  selectGender = (e) => {
    let num = e.target.dataset.gnum;
    this.setState({gender: Number(num)});
  };

  idEvent = (e) => {this.setState({id: e.target.value})};
  pwdEvent = (e) => {this.setState({pwd: e.target.value})};
  nameEvent = (e) => {this.setState({name: e.target.value})};
  birthEvent = (e) => {this.setState({birth: e.target.value})};

  signup = () => {
    const {state} = this;
    if(state.id === "" || state.pwd === "" || state.name === "") {
      alertDialog.show("회원가입 실패", "값을 확인 해주시기 바랍니다.");
    } else if(state.pwd !== this.rePwd.current.value) {
      alertDialog.show("회원가입 실패", "비밀번호를 확인 해주시기 바랍니다.");
    } else {
      putUser({...this.state, ...{
          memo: null,
          basekeyword: null,
          allow_search: 1, allow_getnews: 0, allow_reqfriends: 1,
          allow_message: 1, 	allow_friendslist: 1, allow_position: 0,
          blocklist: null
        }}, (data) => {
        console.log(data);
        if(Number(data.result) === 1) {
          alertDialog.show("회원가입 성공!", "정상적으로 회원가입 됐습니다.");
          this.props.history.push("/login");

        } else {
          alertDialog.show("회원가입 실패!", "회원가입에 실패 했습니다.");
        }
        
      });
    }
  };

  render() {
    const {gender} = this.state;
    return (
      <div className="signupArticle">
        <h2 className="tit_step">계정 정보를 입력해주세요.</h2>
        <div className="tf_required">계정 아이디</div>
        <input type="text" className="tf_g_feedInfo" placeholder="아이디 입력 (ex. asdf1234 ...)" maxLength="100" onChange={this.idEvent} onInput={this.idEvent}/>

        <div className="tf_required">비밀번호</div>
        <input type="password" className="tf_g_feedInfo" placeholder="비밀번호" maxLength="100" onChange={this.pwdEvent} onInput={this.pwdEvent}/>
        <input type="password" className="tf_g_feedInfo" placeholder="비밀번호 재입력" ref={this.rePwd}/>

        <div className="tf_required">닉네임</div>
        <input type="text" className="tf_g_feedInfo" placeholder="닉네임을 입력해주세요." maxLength="200" onChange={this.nameEvent} onInput={this.nameEvent}/>
        <div className="tf_required">생일[선택]/성별</div>
        <input type="text" className="tf_g_feedInfo" placeholder="(ex. 20030101)" maxLength="8" onChange={this.birthEvent} onInput={this.birthEvent} />
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